import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './components/App'
import NoApiConnectionPage from './components/pages/error/NoApiConnectionPage'
import { hasAPIConnection, printEnvironmentInfo, printUserInfo } from './core/Environment'
import fetchTranslations from './core/LanguageLoader'
import applyTheme from './core/ThemeLoader'
import './index.css'
import { FetchWrapper } from './core/FetchWrapper'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false
        }
    }
});

async function setup(): Promise<boolean> {
    printEnvironmentInfo();
    FetchWrapper.setup();
    try {
        await fetchTranslations();
        await applyTheme();
    } catch (error) {
        console.error('Error during setup:', error);
        return false;
    }

    await printUserInfo();
    return true;
}

async function render() {
    if (await hasAPIConnection()) {
        setup().then(() => {
            createRoot(document.getElementById('root')!).render(
                <StrictMode>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </StrictMode>
            )
        });
    } else {
        createRoot(document.getElementById('root')!).render(
            <StrictMode>
                <NoApiConnectionPage />
            </StrictMode>
        )
    }
}

render();
