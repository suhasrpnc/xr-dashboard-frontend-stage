import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'public/config/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly loginUrl = `${environment.apiUrl}/Auth/login`;

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_UserName: email,
            m_Password: password,
            m_EncryptionType: 0
        };
        return this.http.post<any>(this.loginUrl, payload);
    }
}