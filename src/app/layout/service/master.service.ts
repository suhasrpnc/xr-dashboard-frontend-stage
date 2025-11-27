import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'public/config/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterService {
    private readonly appModuleUrl = `${environment.apiUrl}/AppModule/get_AppModule`;
    private readonly getdepartment = `${environment.apiUrl}/Organization/get_OrganizationDepartment`;
    private readonly getdesignation = `${environment.apiUrl}/Organization/get_OrganizationDesignation`;
    private readonly viewuser = `${environment.apiUrl}/Common/get_MDForUser`;
    private readonly locationState = `${environment.apiUrl}/Location/get_LocationState`;
    private readonly locationCity = `${environment.apiUrl}/Location/get_LocationCity`;
    private readonly certificateMasterUrl = `${environment.apiUrl}/Certificate/get_MasCertificate`;
    private readonly putdepartment = `${environment.apiUrl}/Organization/put_OrganizationDepartment`;
    private readonly putdesignation = `${environment.apiUrl}/Organization/put_OrganizationDesignation`;
    private readonly putdepartmentedit = `${environment.apiUrl}/Organization/put_OrganizationDepartmentEdit`;
    private readonly putdesignationedit = `${environment.apiUrl}/Organization/put_OrganizationDesignationEdit`;
    private readonly putdepartmentdelete = `${environment.apiUrl}/Organization/put_OrganizationDepartmentDelete`;
    private readonly putdesignationdelete = `${environment.apiUrl}/Organization/put_OrganizationDesignationDelete`;

    private token = sessionStorage.getItem('m_login_token');

    constructor(private http: HttpClient) {}

    private getDefaultPayload(extra?: object) {
        return {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_PageNumber: 0,
            m_RowsPerPage: 0,
            ...(extra || {})
        };
    }    

    getAppModules(): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(
            this.appModuleUrl,
            this.getDefaultPayload(),
            { headers }
        );
    }

    getOrganizationDepartment(): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.getdepartment, this.getDefaultPayload(), { headers });
    }    

    getOrganizationDesignation(): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.getdesignation, this.getDefaultPayload(), { headers });
    }

    get_MDForUser(): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.viewuser, this.getDefaultPayload(), { headers });
    }

    get_LocationState(countryId: number): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(
            this.locationState, 
            this.getDefaultPayload({ m_CountryID: countryId }),
            { headers }
        );
    }

    get_LocationCity(countryId: number, stateId: number): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(
            this.locationCity, 
            this.getDefaultPayload({ m_CountryID: countryId, m_StateID: stateId }),
            { headers }
        );
    }
    
    getMasCertificate(): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(
            this.certificateMasterUrl,
            this.getDefaultPayload(),
            { headers }
        );
    }

    putOrganizationDepartment(payload: any): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.putdepartment, payload, { headers });
    }

    putOrganizationDesignation(payload: any): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.putdesignation, payload, { headers });
    }

    putOrganizationDepartmentEdit(payload: any): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.putdepartmentedit, payload, { headers });
    }

    putOrganizationDesignationEdit(payload: any): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.putdesignationedit, payload, { headers });
    }

    putOrganizationDepartmentDelete(departmentId: number): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_ID: departmentId
        };
        return this.http.post<any>(this.putdepartmentdelete, payload, { headers });
    }

    putOrganizationDesignationDelete(designationId: number): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_ID: designationId
        };
        return this.http.post<any>(this.putdesignationdelete, payload, { headers });
    }

}