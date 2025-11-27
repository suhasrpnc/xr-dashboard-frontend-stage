export interface CertificateModel {
  id: string;
  employeeName: string;
  courseName: string;
  issueDate?: Date;
  status: 'Pending' | 'Issued';
  certificateUrl?: string;
}