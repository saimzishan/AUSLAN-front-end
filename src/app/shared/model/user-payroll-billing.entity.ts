export class UserPayrollBilling {
    public id: number;
    public ordinary_hours: string;
    public night_weekdays: string;
    public weekend: string;
    public travel: string;
    public invoice;
    public ledger_code;
    public gst: string;

    fromJSON(data: any) {
        this.id = data.id;
        this.ordinary_hours = data.ordinary_hours;
        this.night_weekdays = data.night_weekdays;
        this.weekend = data.weekend;
        this.travel = data.travel;
        this.invoice = data.invoice;
        this.gst = data.gst;
        this.ledger_code = data.ledger_code;
    }

    createJSON() {
        let o = new Object({
            ordinary_hours: this.ordinary_hours,
            night_weekdays: this.night_weekdays,
            weekend: this.weekend,
            travel: this.travel,
            invoice: this.invoice,
            gst: this.gst,
            ledger_code: this.ledger_code
        });
        return o;
    }
}
