import { Dispatch, SetStateAction } from "react";

export enum Screens {
  Home = "index",
  NotFound = "+not-found",
  CompleteProfile = "complete-profile",
  JobDetails = "job-details",
  JobListing = "job-listing",
  SelectSchedule = "select-schedule",
  ManageCustomers = "manage-customers",
  AddEditCustomers = "add-edit-customers",
  ContactList = "contact-list",
  SelectCustomer = "select-customer",
  SelectInvoiceCustomer = "select-invoice-customer",
  AddQuotationDetails = "add-quotation-details",
  QuotationScreen = "quotation-screen",
  InvoiceScreen = "invoice-create-screen",
  InvoiceDetailsScreen = "invoice-screen",
  QuotationPreview = "quotation-preview",
  InvoicePreview = "invoice-preview",
  DeleteAccount = "delete-account",
  DeactivateAccount = "deactivate-account",
  Notifications = "notifications",
  JobMessageScreen = "job-message-screen",
  ConfirmJobStart = "confirm-job-start",
  ConfirmJobCompletion = "confirm-job-completion",
  JobInvoiceDetails = "job-invoice-details",
  JobCustomerAccount = "job-customer-account",
  JobServiceReminder = "job-service-reminder",
  JobInvoicePayment = "job-invoice-payment",
  SelectService = "select-service",
  DocumentIdentificationScreen = "document-identification-screen",
  CertificateUploadScreen = "certificate-upload-screen",
  WorkExperienceUpdateScreen = "work-experience-update-screen",
  UpdatePincodeScreen = "update-pincode-screen",
  VendorViewDay = "vendor-view-day",
  VendorUpdateSchedule = "vendor-update-schedule",
  NotificationDetails = "notification-details",
  QuotationScreenPage = "quotation-page-screen",
  ShowAddQuotationDetails = "show-quotation-details",
  ViewAllQuotations = "ViewAllQuotations",
  EditPersonalDetailsPage = "edit-personal-details-page",
  ChatScreen = "ChatScreen",
  RatingPopupPage = "rate-us",
}

export enum ProfileCompletionScreens {
  UpdateServices = "update-services",
  UploadKYCDocuments = "upload-kyc-documents",
  UploadCertificates = "upload-certificates",
  UpdateWorkExperience = "update-work-experience",
  UpdateCalender = "update-calender",
}

export type ProfileCompletionScreenParams = {
  data: any;
  userUpdateRequiredScreensOrder?: ProfileCompletionScreens[];
  screen?: ProfileCompletionScreens;
  setScreen?: Dispatch<SetStateAction<ProfileCompletionScreens | undefined>>;
};

export type NotificationQueue = {
  id: string;
  type: string;
  status: string;
  data: any;
  receiverId: string;
  timeToSend: Date;
  retryCount: number;
  sentStatus: string;
  retryInterval: number;
};

export type AuthUser = {
  id: string;
  fullName: string;
};

export type AuthSession = {
  id: string;
  startTime: Date;
  lastActivityTime: Date;
  userId: string;
};

export type AuthContext = {
  user: AuthUser;
  session: AuthSession;
};
