import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'public/config/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url1 = `${environment.apiUrl}/User/get_UserAnalytics`;
    private users = `${environment.apiUrl}/User/get_AllUser`; 
    private apiUrl = `${environment.apiUrl}/User/get_ViewUserDetail`;   
    private url2 = `${environment.apiUrl}/User/get_UserDetail`;
    private url3 = `${environment.apiUrl}/User/put_UserNew`;
    private url4 = `${environment.apiUrl}/User/put_UserEdit`;
    private url5 = `${environment.apiUrl}/User/put_UserDelete`;

    private token = sessionStorage.getItem('m_login_token');

    constructor(private http: HttpClient) {}  

    getUserAnalytics(m_UserID: number): Observable<any> {
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_UserID: m_UserID
        };
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.url1, payload, { headers });
    }

    getAllUser(): Observable<any> {
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
        return this.http.post<any>(this.users, payload, { headers });
    }
    
    getUsers(): Observable<any> {
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_UserRoleID: 3
        };
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.apiUrl, payload, { headers });
    }

    getUserDetail(userID: number) {
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_UserID: userID
        };
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.url2, payload, { headers });
    }   
    
    addUserNew(employeeData: any): Observable<any> {        
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_user: {
                id: employeeData.id ?? 0,
                userNumber: employeeData.employmentNumber ?? "",
                departmentID: employeeData.departmentId ?? 0,
                designationID: employeeData.designationId ?? 0,
                branchID: employeeData.branchId ?? 0,
                contracterID: employeeData.contractorId ?? 0,
                employeementType: employeeData.employmentType ?? "",
                firstName: employeeData.firstName ?? "",
                lastName: employeeData.lastName ?? "",
                gender: employeeData.gender ?? "",
                dateOfBirth: employeeData.dateOfBirth ?? "2025-10-17T02:49:35.342Z",
                nationalIdentificationNumber: employeeData.aadhaarNumber ?? "",
                languageID: employeeData.languageId ?? 0,
                language: employeeData.languageName ?? "",
                address: employeeData.address ?? "",
                area: employeeData.area ?? "",
                cityID: employeeData.cityId ?? 0,
                cityName: employeeData.cityName ?? "",
                postalCode: employeeData.postalCode ?? "",
                stateID: employeeData.stateId ?? 0,
                stateName: employeeData.stateName ?? "",
                countryID: employeeData.countryId ?? 0,
                countryName: employeeData.countryName ?? "",
                phonePrimary: employeeData.phoneNumber ?? "",
                email: employeeData.email ?? "",
                dateOfJoining: employeeData.dateOfJoining ?? "2025-10-17T02:49:35.342Z",
                employmentStatus: employeeData.employmentStatus ?? "",
                isThereSignatureImage: employeeData.isThereSignatureImage ?? true,
                signatureImageURL: employeeData.signatureImageURL ?? "",
                accessCardNumber: employeeData.accessCardNumber ?? "",
                createdUserID: employeeData.createdUserID ?? 0,
                createdDateTime: new Date().toISOString(),
                updatedUserID: employeeData.updatedUserID ?? 0,
                updatedDateTime: new Date().toISOString(),
                isActive: employeeData.isActive ?? true
            },
            m_user_login: {
                id: employeeData.login?.id ?? 0,
                userID: employeeData.login?.userID ?? 0,
                userLoginName: employeeData.login?.userLoginName ?? "",
                userRoleID: employeeData.login?.userRoleID ?? 3,
                userRoleName: employeeData.login?.userRoleName ?? "Employee",
                password: employeeData.login?.password ?? "CHRP@123",
                prevPassword1: employeeData.login?.prevPassword1 ?? "",
                prevPassword2: employeeData.login?.prevPassword2 ?? "",
                prevPassword3: employeeData.login?.prevPassword3 ?? "",
                prevPassword4: employeeData.login?.prevPassword4 ?? "",
                prevPassword5: employeeData.login?.prevPassword5 ?? "",
                secretQuestion: employeeData.login?.secretQuestion ?? "",
                secretAnswer: employeeData.login?.secretAnswer ?? "",
                userCategoryID: employeeData.login?.userCategoryID ?? 0,
                userCategoryName: employeeData.login?.userCategoryName ?? "",
                lastPasswordChange: employeeData.login?.lastPasswordChange ?? "2025-10-17T02:49:35.342Z",
                resetPasswordFlag: employeeData.login?.resetPasswordFlag ?? "0",
                lastLoginDateTime: employeeData.login?.lastLoginDateTime ?? "2025-10-17T02:49:35.342Z",
                isLoginActive: employeeData.login?.isLoginActive ?? true,
                isLoginLocked: employeeData.login?.isLoginLocked ?? false,
                lastLoginIPAddress: employeeData.login?.lastLoginIPAddress ?? "",
                lastLoginMachineName: employeeData.login?.lastLoginMachineName ?? "",
                lastLoginMachineDetails: employeeData.login?.lastLoginMachineDetails ?? "",
                createdUserID: employeeData.login?.createdUserID ?? 0,
                createdDateTime: new Date().toISOString(),
                updatedUserID: employeeData.login?.updatedUserID ?? 0,
                updatedDateTime: new Date().toISOString(),
                isActive: employeeData.login?.isActive ?? true
            }
        };
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.url3, payload, { headers });
    }      

    putUserEdit(employeeData: any) {       
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_user: {
                id: employeeData.id ?? 0,
                userNumber: employeeData.EmploymentNumber ?? "",
                departmentID: employeeData.DepartmentID ?? 0,
                designationID: employeeData.DesignationID ?? 0,
                branchID: employeeData.BranchID ?? 0,
                contracterID: employeeData.ContractorID ?? 0,
                employeementType: employeeData.EmploymentType ?? null,
                firstName: employeeData.FirstName ?? "",
                lastName: employeeData.LastName ?? "",
                gender: employeeData.Gender ?? "",
                dateOfBirth: employeeData.DateOfBirth ?? "2025-10-17T02:49:35.342Z",
                nationalIdentificationNumber: employeeData.AadhaarNumber ?? "",
                languageID: employeeData.LanguageID ?? 0,
                language: employeeData.LanguageName ?? "",
                address: employeeData.Address ?? "",
                area: employeeData.Area ?? "",
                cityID: employeeData.CityID ?? 0,
                cityName: employeeData.CityName ?? "",
                postalCode: employeeData.PostalCode ?? "",
                stateID: employeeData.StateID ?? 0,
                stateName: employeeData.StateName ?? "",
                countryID: employeeData.CountryID ?? 0,
                countryName: employeeData.CountryName ?? "",
                phonePrimary: employeeData.PhoneNumber ?? "",
                email: employeeData.Email ?? "",
                dateOfJoining: employeeData.dateOfJoining ?? "2025-10-17T02:49:35.342Z",
                employmentStatus: employeeData.employmentStatus ?? "",
                isThereSignatureImage: employeeData.isThereSignatureImage ?? true,
                signatureImageURL: employeeData.signatureImageURL ?? "",
                accessCardNumber: employeeData.accessCardNumber ?? "",
                createdUserID: employeeData.createdUserID ?? 0,
                createdDateTime: employeeData.createdDateTime ?? "2025-10-17T02:49:35.342Z",
                updatedUserID: employeeData.updatedUserID ?? 0,
                updatedDateTime: new Date().toISOString(),
                isActive: employeeData.isActive ?? true
            },
            m_user_login: {
                id: employeeData.login?.id ?? 0,
                userID: employeeData.login?.userID ?? 0,
                userLoginName: employeeData.login?.userLoginName,
                userRoleID: employeeData.login?.userRoleID,
                userRoleName: employeeData.login?.userRoleName,
                password: employeeData.login?.password,
                prevPassword1: employeeData.login?.prevPassword1 ?? "",
                prevPassword2: employeeData.login?.prevPassword2 ?? "",
                prevPassword3: employeeData.login?.prevPassword3 ?? "",
                prevPassword4: employeeData.login?.prevPassword4 ?? "",
                prevPassword5: employeeData.login?.prevPassword5 ?? "",
                secretQuestion: employeeData.login?.secretQuestion ?? "",
                secretAnswer: employeeData.login?.secretAnswer ?? "",
                userCategoryID: employeeData.login?.userCategoryID ?? 0,
                userCategoryName: employeeData.login?.userCategoryName ?? "",
                lastPasswordChange: employeeData.login?.lastPasswordChange ?? "2025-10-17T02:49:35.342Z",
                resetPasswordFlag: employeeData.login?.resetPasswordFlag ?? "0",
                lastLoginDateTime: employeeData.login?.lastLoginDateTime ?? "2025-10-17T02:49:35.342Z",
                isLoginActive: employeeData.login?.isLoginActive ?? true,
                isLoginLocked: employeeData.login?.isLoginLocked ?? true,
                lastLoginIPAddress: employeeData.login?.lastLoginIPAddress ?? "",
                lastLoginMachineName: employeeData.login?.lastLoginMachineName ?? "",
                lastLoginMachineDetails: employeeData.login?.lastLoginMachineDetails ?? "",
                createdUserID: employeeData.login?.createdUserID ?? 0,
                createdDateTime: employeeData.login?.createdDateTime ?? "2025-10-17T02:49:35.342Z",
                updatedUserID: employeeData.login?.updatedUserID ?? 0,
                updatedDateTime: new Date().toISOString(),
                isActive: employeeData.login?.isActive ?? true
            }
        };
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.url4, payload, { headers });
    }


    deleteUser(userID: number): Observable<any> {
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_UserID: userID
        };
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.url5, payload, { headers });
    }
}
