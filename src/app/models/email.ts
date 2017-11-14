import { EmailContent } from './email-content';
import { EmailRecipients } from './email-recipients';
import { EmailSender } from './email-sender';

export interface Email {
    server: string;
    smtpPort?: number;
    useSSL?: boolean;
    subject: string;
    sender: EmailSender
    recipients: EmailRecipients;
    content: EmailContent;
}