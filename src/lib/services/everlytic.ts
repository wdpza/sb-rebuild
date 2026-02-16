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

        console.log("Submitting to Everlytic with data:", json);

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers,
            body: json,
        });

        if (!response.ok) {
            throw new Error(`Everlytic API error: ${response.status} ${response.statusText}`);
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