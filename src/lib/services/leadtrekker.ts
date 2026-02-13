export interface LeadtrekkerConfig {
	apiKey: string;
	apiUrl: string;
	apiUrlFiles: string;
}

export interface LeadData {
	name: string;
	email: string;
	number?: string;
	company?: string;
	sourceid?: string;
	custom_fields?: Record<string, string>;
}

export interface UpdateLeadData {
	leadid: string;
	status?: string;
	[key: string]: any;
}

export class Leadtrekker {
	private apiKey: string;
	private apiUrl: string;
	private apiUrlFiles: string;

	constructor(config: LeadtrekkerConfig) {
		this.apiKey = config.apiKey;
		this.apiUrl = config.apiUrl;
		this.apiUrlFiles = config.apiUrlFiles;
	}

	/**
	 * Push a new lead to Leadtrekker
	 */
	async pushLead(leadData: LeadData): Promise<any> {
		try {
			// Base64 encode all values
			const encodedData: Record<string, any> = {};
			
			Object.entries(leadData).forEach(([key, value]) => {
				if (key === 'custom_fields' && typeof value === 'object') {
					encodedData[key] = {};
					Object.entries(value as Record<string, string>).forEach(([fieldKey, fieldValue]) => {
						encodedData[key][fieldKey] = Buffer.from(String(fieldValue)).toString('base64');
					});
				} else {
					encodedData[key] = Buffer.from(String(value)).toString('base64');
				}
			});

			const response = await fetch(this.apiUrl, {
				method: 'POST',
				headers: {
					'api_key': this.apiKey,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(encodedData),
			});

			const result = await response.json();
			return result;
		} catch (error) {
			console.error('Error pushing lead to Leadtrekker:', error);
			throw error;
		}
	}

	/**
	 * Update an existing lead in Leadtrekker
	 */
	async updateLead(updateData: UpdateLeadData): Promise<any> {
		try {
			const updateUrl = 'https://system.leadtrekker.com/api/updatestatus';

			// Base64 encode all values
			const encodedData: Record<string, string> = {};
			Object.entries(updateData).forEach(([key, value]) => {
				encodedData[key] = Buffer.from(String(value)).toString('base64');
			});

			const response = await fetch(updateUrl, {
				method: 'POST',
				headers: {
					'api_key': this.apiKey,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(encodedData),
			});

			const result = await response.json();
			return result;
		} catch (error) {
			console.error('Error updating lead in Leadtrekker:', error);
			throw error;
		}
	}

	/**
	 * Push a file attachment to a lead
	 * Note: File uploads in Next.js API routes require special handling
	 */
	async pushLeadFile(fileData: FormData): Promise<any> {
		try {
			console.log('Uploading file to Leadtrekker:', this.apiUrlFiles);
			
			const response = await fetch(this.apiUrlFiles, {
				method: 'POST',
				headers: {
					'Apikey': this.apiKey,
				},
				body: fileData,
			});

			console.log('Leadtrekker file upload response status:', response.status);
			
			const responseText = await response.text();
			console.log('Leadtrekker file upload response:', responseText);
			
			try {
				const result = JSON.parse(responseText);
				
				if (result.error) {
					console.error('Leadtrekker API error:', result.error);
					throw new Error(result.error);
				}
				
				return result;
			} catch (parseError) {
				// If response is not JSON, return the text
				return responseText;
			}
		} catch (error) {
			console.error('Error pushing file to Leadtrekker:', error);
			throw error;
		}
	}

	/**
	 * Check if email or name is blocked (spam check)
	 */
	async checkLead(email: string, name: string): Promise<boolean> {
		try {
			const blockedEmails: string[] = [];
			const blockedNames: string[] = ['Robertbuink'];

			// Fetch blocked emails
			try {
				const emailResponse = await fetch('https://kim.starbright.co.za/antispam');
				if (emailResponse.ok) {
					const emailText = await emailResponse.text();
					const emails = emailText.replace(/\s*\<[^\>]*\>/gm, '|');
					blockedEmails.push(...emails.split('|').filter(e => e.trim()));
				}
			} catch (error) {
				console.error('Error fetching blocked emails:', error);
			}

			// Fetch blocked names
			try {
				const nameResponse = await fetch('https://kim.starbright.co.za/antispam/?t=name');
				if (nameResponse.ok) {
					const nameText = await nameResponse.text();
					const names = nameText.replace(/\s*\<[^\>]*\>/gm, '|');
					blockedNames.push(...names.split('|').filter(n => n.trim()));
				}
			} catch (error) {
				console.error('Error fetching blocked names:', error);
			}

			// Check if email or name is blocked
			if (blockedEmails.includes(email) || blockedNames.includes(name)) {
				return false;
			}

			return true;
		} catch (error) {
			console.error('Error checking lead:', error);
			// Return true on error to not block legitimate submissions
			return true;
		}
	}

	/**
	 * Add URL tracking parameters to lead data
	 */
	addParams(leadData: LeadData, urlParams?: Record<string, string>): LeadData {
		if (urlParams && Object.keys(urlParams).length > 0) {
			if (!leadData.custom_fields) {
				leadData.custom_fields = {};
			}

			Object.entries(urlParams).forEach(([key, value]) => {
				if (leadData.custom_fields) {
					leadData.custom_fields[key] = value;
				}
			});
		}

		return leadData;
	}
}

// Export a singleton instance with environment variables
export function createLeadtrekkerInstance(): Leadtrekker | null {
	const apiKey = process.env.LEADTREKKER_API_KEY;
	const apiUrl = process.env.LEADTREKKER_API_URL || 'https://system.leadtrekker.com/api/createlead';
	const apiUrlFiles = process.env.LEADTREKKER_API_URL_FILES || 'https://system.leadtrekker.com/api/createattachment';

	if (!apiKey) {
		console.warn('LEADTREKKER_API_KEY not configured');
		return null;
	}

	return new Leadtrekker({
		apiKey,
		apiUrl,
		apiUrlFiles,
	});
}
