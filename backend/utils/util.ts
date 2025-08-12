export class Util {
    static formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
    static JSONtoArray(json: string): any[] {
        try {
            const obj = JSON.parse(json);
            return Array.isArray(obj) ? obj : [obj];
        } catch (error) {
            console.error("Invalid JSON string");
            return [];
        }
    }
}
