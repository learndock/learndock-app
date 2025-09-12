import { useState } from "react";
import { FetchError } from "../../../core/FetchWrapper";
import { useLang } from "../../../hooks/Language.hooks.ts";
import { AuthRequest } from "../../../types/Auth.types";
import { performLogin } from "../../../utils/Auth.utils.ts";
import { Modal } from "../../lib/Modals/Modal.tsx";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSwitch: () => void;
}

export const LoginModal = ({ isOpen, onClose, onSwitch }: Props) => {
    const lang = useLang();
    const [form, setForm] = useState<AuthRequest>({ username: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const success = await performLogin(form);
            setError(success ? null : lang("ERROR_UNEXPECTED"));
            onClose();
        } catch (error) {
            if (!(error instanceof FetchError)) return setError(lang("ERROR_UNEXPECTED"));

            switch (error.status) {
                case 401:
                    setError(lang("ERROR_INVALID_CREDENTIALS"));
                    break;
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} backgroundOpacity={70}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-primary">{lang("AUTH_LOGIN_TITLE")}</h2>

                {error && <p className="text-error text-sm">{error}</p>}

                <div>
                    <label className="block text-text-secondary">{lang("AUTH_USERNAME")}</label>
                    <input
                        name="username"
                        type="text"
                        required
                        value={form.username}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 bg-background border border-borders rounded-md text-text-primary"
                    />
                </div>

                <div>
                    <label className="block text-text-secondary">{lang("AUTH_PASSWORD")}</label>
                    <input
                        name="password"
                        type="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 bg-background border border-borders rounded-md text-text-primary"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-accent text-white py-2 rounded-md hover:opacity-90 transition"
                >
                    {lang("AUTH_LOGIN")}
                </button>
            </form>
            <p className="text-sm mt-4 text-text-muted">
                {lang("AUTH_NO_ACCOUNT")}{" "}
                <button onClick={onSwitch} className="text-accent hover:underline">{lang("AUTH_REGISTER_REGISTER_HERE")}</button>
            </p>
        </Modal>
    );
};
