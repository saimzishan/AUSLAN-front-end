
export class Payments {
    public payroll_attributes = [];
    public invoice_attributes = [];

    fromJSON(type: string, data: any) {
        data.forEach(payrollInvoice => {
            payrollInvoice.interpreting_time = this.minutesToTime(payrollInvoice.interpreting_time);
            payrollInvoice.preparation_time = this.minutesToTime(payrollInvoice.preparation_time);
            payrollInvoice.travel_time = this.minutesToTime(payrollInvoice.travel_time);
            payrollInvoice.distance = this.meterToKm(payrollInvoice.distance);

            if (type === 'payroll') {
                this.payroll_attributes.push(payrollInvoice);
            } else {
                this.invoice_attributes.push(payrollInvoice);
            }
        });
    }

    minutesToTime(minutes: string) {
        let min = +minutes;
        let hours = Math.floor(min / 60);
        let remainingMinutes = this.roundOffMinutes(min % 60).toString();
        return hours + ':' + (remainingMinutes.length === 1 ? '0' + remainingMinutes : remainingMinutes);
    }

    roundOffMinutes(minutes: number) {
        let minute = Math.ceil(minutes / 5) * 5;
        return minute;
    }

    timeDistanceConversion(type: string, data: any) {
        if (type === 'payroll') {
            this.payroll_attributes = [];
        } else {
            this.invoice_attributes = [];
        }

        data.forEach(payrollInvoice => {
            payrollInvoice.interpreting_time = this.convertToMinutes(payrollInvoice.interpreting_time);
            payrollInvoice.preparation_time = this.convertToMinutes(payrollInvoice.preparation_time);
            payrollInvoice.travel_time = this.convertToMinutes(payrollInvoice.travel_time);
            payrollInvoice.distance = this.kmToMeter(payrollInvoice.distance);

            if (type === 'payroll') {
                this.payroll_attributes.push(payrollInvoice);
            } else {
                this.invoice_attributes.push(payrollInvoice);
            }
        });
    }

    meterToKm(meters: string) {
        if (meters === '0.0') {
            return 0;
        } else {
            return Math.round((+meters / 1000));
        }
    }

    kmToMeter(km: string) {
        if (km === '0.0') {
            return km;
        } else {
            return (+km * 1000);
        }
    }

    convertToMinutes(time) {
        if (time.toString() === '0') {
            return time;
        }
        if (time.indexOf(':') !== -1) {
            let split = time.split(':');
            let hours = split[0];
            let minutes = split[1];
            return (+hours * 60 + +minutes).toString();
        } else {
            return time;
        }
    }
}
