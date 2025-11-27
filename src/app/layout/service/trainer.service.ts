import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'public/config/environment';

@Injectable({
    providedIn: 'root'
})
export class TrainerService {
    private apiUrl = `${environment.apiUrl}/User/get_ViewUserDetail`;   
    private url2 = `${environment.apiUrl}/User/get_UserDetail`;
    private url3 = `${environment.apiUrl}/User/put_UserNew`;
    private url4 = `${environment.apiUrl}/User/put_UserEdit`;
    private assignRole = `${environment.apiUrl}/User/put_AssignRole`;
    private token = sessionStorage.getItem('m_login_token');

    constructor(private http: HttpClient) {}  
    
    getTrainers(): Observable<any> {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_UserRoleID: 2
        };
        return this.http.post<any>(this.apiUrl, payload, { headers });
    }

    getTrainerDetail(userID: number) {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_UserID: userID
        };
        return this.http.post<any>(this.url2, payload, { headers });
    }  
    
    addEmployee(employeeData: any): Observable<any> {        
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
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
                createdDateTime: employeeData.createdDateTime ?? "2025-10-17T02:49:35.342Z",
                updatedUserID: employeeData.updatedUserID ?? 0,
                updatedDateTime: employeeData.updatedDateTime ?? "2025-10-17T02:49:35.342Z",
                isActive: employeeData.isActive ?? true
            },
            m_user_login: {
                id: employeeData.login?.id ?? 0,
                userID: employeeData.login?.userID ?? 0,
                userLoginName: employeeData.login?.userLoginName ?? "string",
                userRoleID: employeeData.login?.userRoleID ?? 2,
                userRoleName: employeeData.login?.userRoleName ?? "Trainer",
                password: employeeData.login?.password ?? "trn@123$!",
                prevPassword1: employeeData.login?.prevPassword1 ?? "string",
                prevPassword2: employeeData.login?.prevPassword2 ?? "string",
                prevPassword3: employeeData.login?.prevPassword3 ?? "string",
                prevPassword4: employeeData.login?.prevPassword4 ?? "string",
                prevPassword5: employeeData.login?.prevPassword5 ?? "string",
                secretQuestion: employeeData.login?.secretQuestion ?? "string",
                secretAnswer: employeeData.login?.secretAnswer ?? "string",
                userCategoryID: employeeData.login?.userCategoryID ?? 0,
                userCategoryName: employeeData.login?.userCategoryName ?? "string",
                lastPasswordChange: employeeData.login?.lastPasswordChange ?? "2025-10-17T02:49:35.342Z",
                resetPasswordFlag: employeeData.login?.resetPasswordFlag ?? "0",
                lastLoginDateTime: employeeData.login?.lastLoginDateTime ?? "2025-10-17T02:49:35.342Z",
                isLoginActive: employeeData.login?.isLoginActive ?? true,
                isLoginLocked: employeeData.login?.isLoginLocked ?? true,
                lastLoginIPAddress: employeeData.login?.lastLoginIPAddress ?? "string",
                lastLoginMachineName: employeeData.login?.lastLoginMachineName ?? "string",
                lastLoginMachineDetails: employeeData.login?.lastLoginMachineDetails ?? "string",
                createdUserID: employeeData.login?.createdUserID ?? 0,
                createdDateTime: employeeData.login?.createdDateTime ?? "2025-10-17T02:49:35.342Z",
                updatedUserID: employeeData.login?.updatedUserID ?? 0,
                updatedDateTime: employeeData.login?.updatedDateTime ?? "2025-10-17T02:49:35.342Z",
                isActive: employeeData.login?.isActive ?? true
            }
        };
        return this.http.post<any>(this.url3, payload, { headers });
    }      

    putUserEdit(employeeData: any) {       
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_user: {
                id: employeeData.id ?? 0,
                userNumber: employeeData.EmploymentNumber ?? "string",
                departmentID: employeeData.DepartmentID ?? 0,
                designationID: employeeData.DesignationID ?? 0,
                branchID: employeeData.BranchID ?? 0,
                contracterID: employeeData.ContractorID ?? 0,
                employeementType: employeeData.EmploymentType ?? null,
                firstName: employeeData.FirstName ?? "string",
                lastName: employeeData.LastName ?? "string",
                gender: employeeData.Gender ?? "string",
                dateOfBirth: employeeData.DateOfBirth ?? "2025-10-17T02:49:35.342Z",
                nationalIdentificationNumber: employeeData.AadhaarNumber ?? "string",
                languageID: employeeData.LanguageID ?? 0,
                language: employeeData.LanguageName ?? "string",
                address: employeeData.Address ?? "string",
                area: employeeData.Area ?? "string",
                cityID: employeeData.CityID ?? 0,
                cityName: employeeData.CityName ?? "string",
                postalCode: employeeData.PostalCode ?? "string",
                stateID: employeeData.StateID ?? 0,
                stateName: employeeData.StateName ?? "string",
                countryID: employeeData.CountryID ?? 0,
                countryName: employeeData.CountryName ?? "string",
                phonePrimary: employeeData.PhoneNumber ?? "string",
                email: employeeData.Email ?? "string",
                dateOfJoining: employeeData.dateOfJoining ?? "2025-10-17T02:49:35.342Z",
                employmentStatus: employeeData.employmentStatus ?? "string",
                isThereSignatureImage: employeeData.isThereSignatureImage ?? true,
                signatureImageURL: employeeData.signatureImageURL ?? "string",
                accessCardNumber: employeeData.accessCardNumber ?? "string",
                createdUserID: employeeData.createdUserID ?? 0,
                createdDateTime: employeeData.createdDateTime ?? "2025-10-17T02:49:35.342Z",
                updatedUserID: employeeData.updatedUserID ?? 0,
                updatedDateTime: employeeData.updatedDateTime ?? "2025-10-17T02:49:35.342Z",
                isActive: employeeData.isActive ?? true
            },
            m_user_login: {
                id: employeeData.login?.id ?? 0,
                userID: employeeData.login?.userID ?? 0,
                userLoginName: employeeData.login?.userLoginName ?? "string",
                userRoleID: employeeData.login?.userRoleID ?? 3,
                userRoleName: employeeData.login?.userRoleName ?? "Employee",
                password: employeeData.login?.password ?? "string",
                prevPassword1: employeeData.login?.prevPassword1 ?? "string",
                prevPassword2: employeeData.login?.prevPassword2 ?? "string",
                prevPassword3: employeeData.login?.prevPassword3 ?? "string",
                prevPassword4: employeeData.login?.prevPassword4 ?? "string",
                prevPassword5: employeeData.login?.prevPassword5 ?? "string",
                secretQuestion: employeeData.login?.secretQuestion ?? "string",
                secretAnswer: employeeData.login?.secretAnswer ?? "string",
                userCategoryID: employeeData.login?.userCategoryID ?? 0,
                userCategoryName: employeeData.login?.userCategoryName ?? "string",
                lastPasswordChange: employeeData.login?.lastPasswordChange ?? "2025-10-17T02:49:35.342Z",
                resetPasswordFlag: employeeData.login?.resetPasswordFlag ?? "0",
                lastLoginDateTime: employeeData.login?.lastLoginDateTime ?? "2025-10-17T02:49:35.342Z",
                isLoginActive: employeeData.login?.isLoginActive ?? true,
                isLoginLocked: employeeData.login?.isLoginLocked ?? true,
                lastLoginIPAddress: employeeData.login?.lastLoginIPAddress ?? "string",
                lastLoginMachineName: employeeData.login?.lastLoginMachineName ?? "string",
                lastLoginMachineDetails: employeeData.login?.lastLoginMachineDetails ?? "string",
                createdUserID: employeeData.login?.createdUserID ?? 0,
                createdDateTime: employeeData.login?.createdDateTime ?? "2025-10-17T02:49:35.342Z",
                updatedUserID: employeeData.login?.updatedUserID ?? 0,
                updatedDateTime: employeeData.login?.updatedDateTime ?? "2025-10-17T02:49:35.342Z",
                isActive: employeeData.login?.isActive ?? true
            }
        };
        return this.http.post<any>(this.url4, payload, { headers });
    }

    putAssignRole(m_UserID: number, m_UserRoleID: number, m_UserRoleName: string, userDBConnStr: string = "string") {
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: userDBConnStr,
            m_UserID: m_UserID,
            m_UserRoleID: m_UserRoleID,
            m_UserRoleName: m_UserRoleName
        };
        return this.http.post<any>(this.assignRole, payload, { headers });
    }
}
