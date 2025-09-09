import { useEffect, useRef, useState } from "react";
import { IoReload } from "react-icons/io5";

const COOLDOWN_MS = 3000;
const BUTTON_WIDTH = 200;
const BUTTON_HEIGHT = 60;
const MIN_VELOCITY = 1.5;
const MAX_VELOCITY = 2.5;
const JUMP_STRENGTH = 150;

function getRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
}

function getRandomGradient() {
    return `linear-gradient(to right, ${getRandomColor()}, ${getRandomColor()})`;
}

export default function BouncingReloadButton() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [cooldown, setCooldown] = useState(false);
    const [gradient, setGradient] = useState(getRandomGradient());

    const position = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const rafId = useRef<number | null>(null);

    const randomVelocity = () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (MAX_VELOCITY - MIN_VELOCITY) + MIN_VELOCITY;
        return {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
        };
    };

    const setInitialPosition = () => {
        const container = containerRef.current;
        if (!container) return;
        const maxX = container.clientWidth - BUTTON_WIDTH;
        const maxY = container.clientHeight - BUTTON_HEIGHT;
        position.current.x = Math.random() * maxX;
        position.current.y = Math.random() * maxY;
    };

    const updateButtonTransform = () => {
        if (buttonRef.current) {
            buttonRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
        }
    };

    /*
    const avoidElements = () => {
        const button = buttonRef.current;
        if (!button) return;

        const buttonRect = button.getBoundingClientRect();
        const avoidables = document.querySelectorAll<HTMLElement>("[data-avoid]");

        avoidables.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const overlapX = Math.max(0, Math.min(buttonRect.right, rect.right) - Math.max(buttonRect.left, rect.left));
            const overlapY = Math.max(0, Math.min(buttonRect.bottom, rect.bottom) - Math.max(buttonRect.top, rect.top));
            const area = overlapX * overlapY;

            if (area > 0) {
                const elCenterX = (rect.left + rect.right) / 2;
                const elCenterY = (rect.top + rect.bottom) / 2;
                const btnCenterX = (buttonRect.left + buttonRect.right) / 2;
                const btnCenterY = (buttonRect.top + buttonRect.bottom) / 2;
                const dx = btnCenterX - elCenterX;
                const dy = btnCenterY - elCenterY;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const force = Math.min(10, area / 1000);
                velocity.current.x += (dx / dist) * force * 0.1;
                velocity.current.y += (dy / dist) * force * 0.1;
            }
        });
    };
    */

    const clampPosition = () => {
        const container = containerRef.current;
        if (!container) return;
        const maxX = container.clientWidth - BUTTON_WIDTH;
        const maxY = container.clientHeight - BUTTON_HEIGHT;
        position.current.x = Math.max(0, Math.min(position.current.x, maxX));
        position.current.y = Math.max(0, Math.min(position.current.y, maxY));
    };

    const animate = () => {
        const container = containerRef.current;
        if (!container) return;

        // avoidElements(); Maybe try again in the future :()

        position.current.x += velocity.current.x;
        position.current.y += velocity.current.y;

        const maxX = container.clientWidth - BUTTON_WIDTH;
        const maxY = container.clientHeight - BUTTON_HEIGHT;

        if (position.current.x <= 0 || position.current.x >= maxX) {
            velocity.current.x *= -1;
            position.current.x = Math.max(0, Math.min(position.current.x, maxX));
        }

        if (position.current.y <= 0 || position.current.y >= maxY) {
            velocity.current.y *= -1;
            position.current.y = Math.max(0, Math.min(position.current.y, maxY));
        }

        const MIN_SPEED = 0.8;
        const speed = Math.hypot(velocity.current.x, velocity.current.y);
        if (speed < MIN_SPEED) {
            velocity.current = randomVelocity();
        }

        updateButtonTransform();
        rafId.current = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
        if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
    };

    const startAnimation = () => {
        stopAnimation();
        rafId.current = requestAnimationFrame(animate);
    };

    const forceJump = () => {
        const angle = Math.random() * Math.PI * 2;
        const dx = Math.cos(angle) * JUMP_STRENGTH;
        const dy = Math.sin(angle) * JUMP_STRENGTH;

        position.current.x += dx;
        position.current.y += dy;
        clampPosition();
        updateButtonTransform();
    };

    const handleHover = () => {
        if (cooldown) return;

        setCooldown(true);
        setGradient(getRandomGradient());
        forceJump();

        stopAnimation();
        velocity.current = { x: 0, y: 0 };

        setTimeout(() => {
            velocity.current = randomVelocity();
            setCooldown(false);
            startAnimation();
        }, COOLDOWN_MS);
    };

    useEffect(() => {
        setInitialPosition();
        updateButtonTransform();
        velocity.current = randomVelocity();
        startAnimation();

        return () => stopAnimation();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            aria-hidden="true"
        >
            <button
                ref={buttonRef}
                onClick={() => location.reload()}
                onMouseEnter={handleHover}
                className={`pointer-events-auto absolute flex items-center justify-center gap-2 px-6 text-white font-semibold shadow-xl transition-transform duration-300 active:scale-95 ${
                    cooldown ? "animate-pulse ring-2 ring-white/50" : ""
                }`}
                style={{
                    width: BUTTON_WIDTH,
                    height: BUTTON_HEIGHT,
                    borderRadius: 12,
                    willChange: "transform",
                    background: gradient,
                    zIndex: 2,
                }}
                title="Reload page"
                aria-label="Reload page"
            >
                <span>Reload</span>
                <IoReload className="w-6 h-6" />
            </button>
        </div>
    );
}
