export interface EverlyticConfig {
	apiKey: string;
	apiUrl: string;
	username: string;
}

export class Everlytic {
    private apiKey: string;
    private apiUrl: string;
    private username: string;

    constructor(config: EverlyticConfig) {
        this.apiKey = config.apiKey;
        this.apiUrl = config.apiUrl;
        this.username = config.username;
    }

    async pushLead(jsonObject: Record<string, any>): Promise<any> {

        const auth = Buffer.from(`${this.username}:${this.apiKey}`).toString('base64');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
        };

        const json = JSON.stringify(jsonObject);

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers,
            body: json,
        });

        if (!response.ok) {
            const body = await response.text().catch(() => '');
            console.error(`Everlytic API error: ${response.status} ${response.statusText}`, body);
            throw new Error(`Everlytic API error: ${response.status} ${response.statusText}${body ? ` — ${body.slice(0, 500)}` : ''}`);
        }

        return response.json();
    }

    async getContact(contactId: string): Promise<any> {
        const auth = Buffer.from(`${this.username}:${this.apiKey}`).toString('base64');

        const headers = {
            'Authorization': `Basic ${auth}`,
        };

        const url = `${this.apiUrl}/${contactId}`;

        const response = await fetch(url, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const body = await response.text().catch(() => '');
            console.error(`Everlytic API error: ${response.status} ${response.statusText}`, body);
            throw new Error(`Everlytic API error: ${response.status} ${response.statusText}${body ? ` — ${body.slice(0, 500)}` : ''}`);
        }

        return response.json();
    }
}

export function createEverlyticInstance(): Everlytic | null {
    const apiKey = process.env.EVERLYTIC_API_KEY;
    const apiUrl = process.env.EVERLYTIC_API_URL || 'http://bulkemail.starbright.co.za/api/2.0/contacts';
    const username = process.env.EVERLYTIC_USERNAME || '';

    if (!apiKey) {
        console.warn('EVERLYTIC_API_KEY not configured');
        return null;
    }

    return new Everlytic({
        username,
        apiKey,
        apiUrl
    });
}