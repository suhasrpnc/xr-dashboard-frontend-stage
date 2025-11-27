import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'public/config/environment';

@Injectable({
    providedIn: 'root'
})
export class CertificateService {
    private certificate = `${environment.apiUrl}/Certificate/get_AllCertificate`; 
    private putNewCertificate = `${environment.apiUrl}/Certificate/put_NewCertificate`;
    private token = sessionStorage.getItem('m_login_token');
    constructor(private http: HttpClient) {}  

    get_AllCertificate(): Observable<any> {
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string"
        };
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.certificate, payload, { headers });
    }

    put_NewCertificate(certificateData: any): Observable<any> {
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_certificate: certificateData
        };
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.putNewCertificate, payload, { headers });
    }
}