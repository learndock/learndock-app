import { FC } from 'react';
import { DotLoader } from 'react-spinners';
import ActionButton from '../../lib/Buttons/Action.Button';
import { useLocation, useNavigate } from 'react-router';
import { MdOpenInNew } from 'react-icons/md';

interface GenericErrorBannerProps {
    errorCode?: string;
    message?: string;
}

export const GenericErrorBanner: FC<GenericErrorBannerProps> = ({ errorCode, message }) => {
    const isNumber = !isNaN(Number(errorCode));
    const mdnLink = isNumber ? `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${errorCode}` : undefined;
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className="w-full flex justify-center pt-10 pb-6 dark:text-white text-black">
            <div className="flex flex-col items-center gap-6">
                <div className='flex flex-col items-center gap-8 font-bold text-5xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent'>
                    <DotLoader color={'#22d3ee'} />
                    <div className='flex flex-row justify-center items-center gap-6'>
                        <span>{isNumber ? "HTTP " + errorCode : "Oh no! An error occured..."}</span>
                    </div>
                </div>
                <div className="text-center max-w-lg">
                    {message || "Something went wrong. Please try again later."}
                </div>
                <div className='flex flex-row justify-center items-center gap-2'>
                    {pathname != "/" && (
                        <ActionButton
                            onClick={() => navigate("/")}
                            rel="noopener noreferrer"
                        >
                            Go Home
                        </ActionButton>
                    )}
                    {mdnLink && (
                        <ActionButton
                            onClick={() => window.open(mdnLink, "-blank")}
                            rel="noopener noreferrer"
                        >
                            <MdOpenInNew /> Learn more
                        </ActionButton>
                    )}
                </div>
            </div>
        </div>
    );
};
