export type ErrorFAQ = ErrorFAQItem[];

export interface ErrorFAQItem {
  title: string;
  description: React.ReactNode;
  special?: boolean;
}

export const noApiConnectionConfig: ErrorFAQ = [
  {
    title: "Why am I seeing this page?",
    description: (
      `
        You are currently not connected to the API, which is responsible for
        providing all data about users, content etc. but also themes and
        languages. Therefore we cannot display the usual interface as colors
        and text would not be loaded.
      `
    ),
  },
  {
    title: "Why does this happen?",
    description: (
      `
        This issue usually happens when the server on which this application is
        running shuts down but the HTML page you are seeing is still cached in
        your browser. If you try refreshing the page and it does not load
        anymore, everything is fine since the administrator will just have to
        restart the server.
      `
    ),
  },
  {
    title: "Will this issue have permanent effects?",
    description: (
      `
        No, this issue is temporary and can be resolved by reconnecting to the
        API. Neither your data nor your system in general can be harmed in any
        way solely due to this issue.
      `
    ),
  },
  {
    title: "What can I do about it?",
    description: (
      `
        First try to refresh the page please. If you still encounter this issue,
        please contact your administrator for assistance. This issue does not
        happen because of anything you have done, so you do not need to worry
        about it.
        <p>
          If you are the administrator, please check the server and ensure it is
          running properly. Otherwise, please see the official documentation for
          further assistance.
        </p>
      `
    ),
  },
  {
    title: "What's that button?!",
    description: (
      `
        The button is a reload button that allows you to refresh the page and
        attempt to reconnect to the API. It appeared because you cracked the
        secret code! :)
      `
    ),
    special: true,
  },
];

export const configUnexpected: ErrorFAQ = [
  {
    title: "What happened?",
    description: (
      `
        An unexpected error occurred while trying to load the application.
        Unfortunately, we don’t have more details about the cause right now.
      `
    ),
  },
  {
    title: "What can I do?",
    description: (
      `
        Please try refreshing the page. If the issue persists, contact your
        administrator for assistance.
      `
    ),
  },
];

export const config401: ErrorFAQ = [
  {
    title: "Why am I seeing this?",
    description: (
      `
        You tried to access a resource that requires authentication, but you are
        not logged in or your session has expired.
      `
    ),
  },
  {
    title: "What can I do?",
    description: (
      `
        Please log in again to continue. If you don’t have access, reach out to
        your administrator.
      `
    ),
  },
];

export const config403: ErrorFAQ = [
  {
    title: "Why am I seeing this?",
    description: (
      `
        You are logged in but don’t have the necessary permissions to view this
        page or resource.
      `
    ),
  },
  {
    title: "What can I do?",
    description: (
      `
        If you believe you should have access, please contact your administrator
        to request the necessary permissions.
      `
    ),
  },
];

export const config500: ErrorFAQ = [
  {
    title: "Why am I seeing this?",
    description: (
      `
        The server encountered an internal error and was unable to complete your
        request.
      `
    ),
  },
  {
    title: "What can I do?",
    description: (
      `
        This issue is usually temporary. Try refreshing the page after a few
        minutes. If the problem continues, please notify your administrator.
      `
    ),
  },
];