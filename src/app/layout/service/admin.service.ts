import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'public/config/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = `${environment.apiUrl}/User/get_ViewUserDetail`;   
    private url2 = `${environment.apiUrl}/User/get_UserDetail`;
    private url3 = `${environment.apiUrl}/User/put_UserNew`;
    private url4 = `${environment.apiUrl}/User/put_UserEdit`;
    private token = sessionStorage.getItem('m_login_token');

    constructor(private http: HttpClient) {}  
    
    getAdmines(): Observable<any> {
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_UserRoleID: 1
        };
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        return this.http.post<any>(this.apiUrl, payload, { headers });
    }

    getAdminDetail(userID: number) {
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
    
    putUserNew(employeeData: any): Observable<any> {        
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_user: {
                id: employeeData.id ?? 0,
                userNumber: employeeData.employmentNumber ?? "string",
                departmentID: employeeData.departmentId ?? 0,
                designationID: employeeData.designationId ?? 0,
                branchID: employeeData.branchId ?? 0,
                contracterID: employeeData.contractorId ?? 0,
                employeementType: employeeData.employmentType ?? "string",
                firstName: employeeData.firstName ?? "string",
                lastName: employeeData.lastName ?? "string",
                gender: employeeData.gender ?? "string",
                dateOfBirth: employeeData.dateOfBirth ?? "2025-10-17T02:49:35.342Z",
                nationalIdentificationNumber: employeeData.aadhaarNumber ?? "string",
                languageID: employeeData.languageId ?? 0,
                language: employeeData.languageName ?? "string",
                address: employeeData.address ?? "string",
                area: employeeData.area ?? "string",
                cityID: employeeData.cityId ?? 0,
                cityName: employeeData.cityName ?? "string",
                postalCode: employeeData.postalCode ?? "string",
                stateID: employeeData.stateId ?? 0,
                stateName: employeeData.stateName ?? "string",
                countryID: employeeData.countryId ?? 0,
                countryName: employeeData.countryName ?? "string",
                phonePrimary: employeeData.phoneNumber ?? "string",
                email: employeeData.email ?? "string",
                dateOfJoining: employeeData.dateOfJoining ?? "2025-10-17T02:49:35.342Z",
                employmentStatus: employeeData.employmentStatus ?? "string",
                isThereSignatureImage: employeeData.isThereSignatureImage ?? true,
                signatureImageURL: employeeData.signatureImageURL ?? "string",
                accessCardNumber: employeeData.accessCardNumber ?? "string",
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
                userRoleID: employeeData.login?.userRoleID ?? 1,
                userRoleName: employeeData.login?.userRoleName ?? "Admin",
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
                isLoginLocked: employeeData.login?.isLoginLocked ?? true,
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
                userLoginName: employeeData.login?.userLoginName ?? "",
                userRoleID: employeeData.login?.userRoleID ?? 3,
                userRoleName: employeeData.login?.userRoleName,
                password: employeeData.login?.password ,
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
}
