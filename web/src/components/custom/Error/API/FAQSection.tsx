import { Accordion, AccordionItem } from "./NoConnectionAccordion";

export const FAQSection: React.FC<{showExtra: boolean}> = ({ showExtra }) => (
    <section className="pt-16 px-4 text-text-primary">
        <h2 className="text-3xl font-bold text-center mb-8">If you're curious...</h2>
        <Accordion>
            <AccordionItem title="Why am I seeing this page?">
                You are currently not connected to the API, which is responsible for providing all data about users, content etc. but also themes and languages. Therefore we cannot display the usual interface as colors and text would not be loaded.
            </AccordionItem>
            <AccordionItem title="Why does this happen?">
                This issue usually happens when the server on which this application is running shuts down but the HTML page you are seeing is still cached in your browser. 
                If you try refreshing the page and it does not load anymore, everything is fine since the administrator will just have to restart the server.
            </AccordionItem>
            <AccordionItem title="Will this issue have permanent effects?">
                No, this issue is temporary and can be resolved by reconnecting to the API. Neither your data nor your system in general can be harmed in any way solely due to this issue.
            </AccordionItem>
            <AccordionItem title="What can I do about it?">
                First try to refresh the page please. If you still encounter this issue, please contact your administrator for assistance. 
                This issue does not happen because of anything you have done, so you do not need to worry about it.
                <p>
                    If you are the administrator, please check the server and ensure it is running properly. Otherwise, please see the official documentation for further assistance.
                </p>
            </AccordionItem>
            {showExtra && (
                <AccordionItem title="What's that button?!">
                    The button is a reload button that allows you to refresh the page and attempt to reconnect to the API. It appeared because you cracked the secret code! :)
                </AccordionItem>
            )}
        </Accordion>
    </section>
);
