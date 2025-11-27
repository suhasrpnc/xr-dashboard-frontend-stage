import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'public/config/environment';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private Upload = `${environment.apiUrl}/Certificate/Upload`;
    private templateUrl = `${environment.apiUrl}/File/DownloadUserTemplate`; 
    private importUserExcelUrl = `${environment.apiUrl}/File/ImportUserExcel`;
    private exportAllUsersExcelUrl = `${environment.apiUrl}/User/ExportAllUsersExcel`;
    private exportSelectedUsersExcelUrl = `${environment.apiUrl}/User/ExportSelectedUsersExcel`;
    
    private token = sessionStorage.getItem('m_login_token');
    constructor(private http: HttpClient) {}  

    uploadCertificate(file: File): Observable<any> {        
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(this.Upload, formData, {
            headers: headers,
            reportProgress: true,
            observe: 'events'
        });
    }

    downloadUserTemplate(): Observable<Blob> {        
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.get(this.templateUrl, {
            headers: headers,
            responseType: 'blob',
            observe: 'body'
        });
    }   

    importUserExcel(file: File): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.importUserExcelUrl, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events'
    });
    }

    downloadAllUsersExcel(): Observable<Blob> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.get(this.exportAllUsersExcelUrl, {
            headers: headers,
            responseType: 'blob',
            observe: 'body'
        });
    }

 
    downloadSelectedUsersExcel(userIds: number[]): Observable<Blob> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string", 
            ml_UserID: userIds.join(",")
        };
        return this.http.post(this.exportSelectedUsersExcelUrl, payload, {
            headers: headers,
            responseType: 'blob',
            observe: 'body'
        });
    }
}