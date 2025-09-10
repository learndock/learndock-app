import { FIAusbVLink } from "../../../../config/Content.config";

interface QuestionSetRegulationLocationProps {
    location: string;
}

export default function QuestionSetRegulationLocation({ location }: QuestionSetRegulationLocationProps) {
    if (location == "") {
        return <>-</>
    }

    function mapReferenceToLink(ref: string): string {
        const match = ref.match(/§\s*(\d+).*Abs\.\s*(\d+)/);
        if (!match) return ref; // fallback if format not valid
        const [, para, abs] = match;
        return `__${para}.html#:~:text=(${abs})`;
    }

    return (
        <a href={FIAusbVLink + mapReferenceToLink(location)} target="_blank">{location}</a>
    );
}
