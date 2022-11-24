
import { UserRole } from '@core/enums/user-role.enum';

export const UBER_TRIPS: UserRole[] = [
  UserRole.UBER_BRIDGE_EVENT_GET_ADMIN
];

export const UBER_PARTNERS: UserRole[] = [
  UserRole.UBER_BRIDGE_USER_GET_ADMIN,
  UserRole.UBER_BRIDGE_VENDOR_GET_ADMIN,
  UserRole.TECH_DEVICE_STATUS_LIST_GET_ADMIN,
  UserRole.UBER_BRIDGE_INVOICE_GET_ADMIN
];

export const UBER_UBER_METRICS: UserRole[] = [
  UserRole.UBER_BRIDGE_EVENT_GET_ADMIN
];

export const UBER_UBER_INVOICES: UserRole[] = [
  UserRole.UBER_BRIDGE_INVOICE_GET_ADMIN,
  UserRole.UBER_BRIDGE_INVOICE_PARTNER_RUN_ALL,
  UserRole.UBER_BRIDGE_INVOICE_SEND_TO_BROKER_SINGLE,
  UserRole.UBER_BRIDGE_INVOICE_SEND_TO_BROKER_ALL,
  UserRole.UBER_BRIDGE_INVOICE_INVOICE_SUMMARY_RUN
];

export const UBER_UBER_MANAGEMENT: UserRole[] = [
  UserRole.UBER_BRIDGE_EVENT_GET_ADMIN,
  UserRole.VIEW_UBER_BRIDGE_REPORTS
];

export const UBER_UBER_USER_TRIPS: UserRole[] = [
  UserRole.UBER_BRIDGE_EVENTS_COUNTER_ADMIN,
  UserRole.UBER_BRIDGE_EVENT_GET_ADMIN,
];

export const UBER_UBER_USER_TRIPS_REFISCAL: UserRole[] = [
  UserRole.UBER_BRIDGE_EVENTS_REPROCESS_ADMIN,
];

export const UBER: UserRole[] = [
  ...UBER_TRIPS,
  ...UBER_PARTNERS,
  ...UBER_UBER_METRICS,
  ...UBER_UBER_INVOICES,
  ...UBER_UBER_MANAGEMENT,
  ...UBER_UBER_USER_TRIPS,
  ...UBER_UBER_USER_TRIPS_REFISCAL,
];

export const DEVICES_LIST: UserRole[] = [
  UserRole.TECH_DEVICE_DIAGNOSTIC_DATA_GET
];

export const DEVICES_STATISTICS: UserRole[] = [
  UserRole.VIEW_TECH_DEVICE_STATISTICS
];

export const DEVICES_FISCALIZATION: UserRole[] = [
  UserRole.FISCALIZATION_FISCALIZED_REGISTERS_GET_ADMIN,
  UserRole.FISCALIZATION_FISCALIZED_REGISTERS_GET_ID_ADMIN,
  UserRole.FISCALIZATION_UNIQUE_NUMBERS_GET_ADMIN,
  UserRole.FISCALIZATION_UNIQUE_NUMBERS_GET_ID_ADMIN
];

export const DEVICES_FIRMWARE_UPGRADE: UserRole[] = [
  UserRole.TECH_FIRMWARE_DEFINITION_GET,
  UserRole.TECH_FIRMWARE_DEFINITION_SAVE,
  UserRole.TECH_FIRMWARE_UPGRADE_PERFORM
];

export const DEVICES_FIRMWARE_HISTORY: UserRole[] = [
  UserRole.TECH_FIRMWARE_VERSION_HISTORY_GET,
];

export const DEVICES_HARDFAULTS: UserRole[] = [
  UserRole.TECH_HARD_FAULT_GET_ADMIN,
  UserRole.TECH_HARD_FAULT_GET_ID_ADMIN
];

export const DEVICES_FILES: UserRole[] = [
  UserRole.TECH_CUSTOM_FILE_GET_ADMIN,
  UserRole.TECH_CUSTOM_FILE_GET_ID_ADMIN
];

export const DEVICES_DETAILS: UserRole[] = [
  UserRole.TECH_DEVICE_DIAGNOSTIC_DATA_GET,
];

export const DEVICES_PM_HISTORY: UserRole[] = [
  UserRole.TECH_DEVICE_PM_HISTORY_GET_ADMIN,
];

export const DEVICES: UserRole[] = [
  ...DEVICES_LIST,
  ...DEVICES_STATISTICS,
  ...DEVICES_FISCALIZATION,
  ...DEVICES_FIRMWARE_UPGRADE,
  ...DEVICES_HARDFAULTS,
  ...DEVICES_FILES,
  ...DEVICES_DETAILS,
  ...DEVICES_PM_HISTORY,
];


export const AUTHENTICATION_ROLES: UserRole[] = [
  UserRole.AUTH_PERMISSION_GET_ADMIN,
  UserRole.AUTH_PERMISSION_GET_ID_ADMIN,
  UserRole.AUTH_ROLE_GET_ADMIN,
  UserRole.AUTH_ROLE_GET_ID_ADMIN
];

export const AUTHENTICATION_SCOPES: UserRole[] = [
  UserRole.AUTH_PERMISSION_GET_ADMIN,
  UserRole.AUTH_PERMISSION_GET_ID_ADMIN,
  UserRole.AUTH_SCOPE_GET_ADMIN,
  UserRole.AUTH_SCOPE_GET_ID_ADMIN
];

export const AUTHENTICATION_APPLICATIONS: UserRole[] = [
  UserRole.AUTH_APPLICATION_GET_ADMIN,
  UserRole.AUTH_APPLICATION_GET_ID_ADMIN,
  UserRole.AUTH_OAUTH_CLIENT_DETAILS_GET_ADMIN,
];

export const AUTHENTICATION_FIREWALL: UserRole[] = [
  UserRole.AUTHENTICATION_FIREWALL_USER_CREATE_ADMIN,
  UserRole.AUTHENTICATION_FIREWALL_USER_PASSWORD_CHANGE_ADMIN,
  UserRole.AUTHENTICATION_FIREWALL_USER_ENABLED_SET_ADMIN,
  UserRole.AUTHENTICATION_FIREWALL_ACCOUNT_GET_ADMIN,
  UserRole.AUTHENTICATION_FIREWALL_ACCOUNT_GET_ID_ADMIN,
  UserRole.AUTHENTICATION_FIREWALL_APPROVED_IP_ADDRESS_GET_ADMIN,
  UserRole.AUTHENTICATION_FIREWALL_APPROVED_IP_ADDRESS_GET_ID_ADMIN,
];

export const AUTHENTICATION: UserRole[] = [
  ...AUTHENTICATION_ROLES,
  ...AUTHENTICATION_SCOPES,
  ...AUTHENTICATION_APPLICATIONS,
  ...AUTHENTICATION_FIREWALL,
];

export const USERS_LIST: UserRole[] = [
  UserRole.AUTH_USER_GET_ADMIN,
  UserRole.AUTH_USER_GET_ID_ADMIN,
];

export const USERS_DETAILS: UserRole[] = [
  UserRole.AUTH_USER_GET_ADMIN,
  UserRole.AUTH_USER_GET_ID_ADMIN,
];

export const USERS_STATISTICS: UserRole[] = [
  UserRole.VIEW_USER_STATISTICS,
];

export const USERS_AGREEMENTS: UserRole[] = [
  UserRole.AUTH_USER_GET_ADMIN,
  UserRole.AUTH_USER_GET_ID_ADMIN,
];

export const USERS: UserRole[] = [
  ...USERS_LIST,
  ...USERS_DETAILS,
  ...USERS_STATISTICS,
  ...USERS_AGREEMENTS,
];

export const DOCUMENTS_RECEIPTS: UserRole[] = [
  UserRole.DOCS_RECEIPT_ADMIN
];

export const DOCUMENTS_DAILY_REPORTS: UserRole[] = [
  UserRole.DOCS_DAILY_REPORT_ADMIN
];

export const DOCUMENTS_MONTHLY_REPORTS: UserRole[] = [
  UserRole.DEVICE_OPERATIONS_MONTHLY_REPORT_LIST_ADMIN,
  UserRole.DEVICE_OPERATIONS_MONTHLY_REPORT_SINGLE_ADMIN
];

export const DOCUMENTS_NONFISCAL_DOCUMENTS: UserRole[] = [
  UserRole.DOCS_NONFISCAL_ADMIN
];

export const DOCUMENTS_INVOICE_TO_RECEIPTS: UserRole[] = [
  UserRole.INVOICE_INVOICE_GET_ADMIN,
  UserRole.INVOICE_INVOICE_GET_ID_ADMIN
];

export const DOCUMENTS_RECEIPTS_CANCEL: UserRole[] = [
  UserRole.DOCS_RECEIPT_CANCEL_ADMIN
];

export const DOCUMENTS_STATISTICS: UserRole[] = [
  UserRole.DOCS_RECEIPT_ADMIN
];

export const DOCUMENTS: UserRole[] = [
  ...DOCUMENTS_RECEIPTS,
  ...DOCUMENTS_DAILY_REPORTS,
  ...DOCUMENTS_MONTHLY_REPORTS,
  ...DOCUMENTS_NONFISCAL_DOCUMENTS,
  ...DOCUMENTS_INVOICE_TO_RECEIPTS,
  ...DOCUMENTS_RECEIPTS_CANCEL,
  ...DOCUMENTS_STATISTICS,
];

export const PROMOTIONS_PROMOTIONS: UserRole[] = [
  UserRole.PROMO_PROMOTION_GET_ADMIN,
  UserRole.PROMO_PROMOTION_GET_ID_ADMIN
];

export const PROMOTIONS_PROMOTIONS_ON_DEVICES: UserRole[] = [
  UserRole.MPLATFORM_BRIDGE_CURRENT_PROMO_ON_DEVICE_GET_ADMIN,
  UserRole.MPLATFORM_BRIDGE_CURRENT_PROMO_ON_DEVICE_GET_ADMIN
];

export const PROMOTIONS_DEVICES: UserRole[] = [
  UserRole.PROMO_DEVICE_GET_ADMIN,
  UserRole.PROMO_DEVICE_GET_ID_ADMIN
];

export const PROMOTIONS: UserRole[] = [
  ...PROMOTIONS_PROMOTIONS,
  ...PROMOTIONS_PROMOTIONS_ON_DEVICES,
  ...PROMOTIONS_DEVICES
];

export const SAP_INVOICES_LISTS: UserRole[] = [
  UserRole.SAP_INVOICE_INVOICE_GET_ADMIN,
  UserRole.SAP_INVOICE_INVOICE_GET_ID_ADMIN
];

export const SAP_INVOICESS: UserRole[] = [
  ...SAP_INVOICES_LISTS
];

export const EMAILS_LIST: UserRole[] = [
  UserRole.MAIL_MAIL_GET_ADMIN,
  UserRole.MAIL_MAIL_GET_ID_ADMIN
];

export const EMAILS_TEMPLATES: UserRole[] = [
  UserRole.MAIL_TEMPLATE_GET_ADMIN,
  UserRole.MAIL_TEMPLATE_GET_ID_ADMIN
];

export const EMAILS: UserRole[] = [
  ...EMAILS_LIST,
  ...EMAILS_TEMPLATES
];

export const SERVICES_DEFINITION: UserRole[] = [
  UserRole.SERVICES_SERVICE_GET_ADMIN,
  UserRole.SERVICES_SERVICE_GET_ID_ADMIN,
  UserRole.LICENSING_BRIDGE_SUPERVISOR_USER_ID_SERVICE_ID_LINKS_GET_ADMIN,
  UserRole.LICENSING_BRIDGE_SUPERVISOR_USER_ID_SERVICE_ID_LINKS_GET_ID_ADMIN,
  UserRole.LICENSING_BRIDGE_OAUTH_CLIENT_ID_SERVICE_ID_LINKS_GET_ADMIN,
  UserRole.LICENSING_BRIDGE_OAUTH_CLIENT_ID_SERVICE_ID_LINKS_GET_ID_ADMIN,
];

export const SERVICES: UserRole[] = [
  ...SERVICES_DEFINITION,
];

export const EVENTS_LIST: UserRole[] = [
  UserRole.EVENT_EVENT_GET_ADMIN,
  UserRole.EVENT_EVENT_GET_ID_ADMIN,
];

export const EVENTS_ORDERS_LIST: UserRole[] = [
  UserRole.EVENT_EVENT_ORDERS_GET_ADMIN,
  UserRole.EVENT_EVENT_ORDERS_GET_ADMIN_ID,
];

export const EVENTS_ORDER: UserRole[] = [
  ...EVENTS_LIST,
  ...EVENTS_ORDERS_LIST,
  UserRole.EVENT_ORDER_EVENT_CHANGE_JOB_SETTINGS,
  UserRole.EVENT_ORDER_ENABLE_WEB_SOCKET,
  UserRole.EVENT_ORDER_FIRMWARE_UPGRADE,
  UserRole.EVENT_ORDER_MAKE_RECEIPT,
  UserRole.EVENT_ORDER_MAKE_TAXI_RECEIPT,
  UserRole.EVENT_ORDER_REVERT_UPLOAD_DOC_BY_DATE,
  UserRole.EVENT_ORDER_REVERT_UPLOAD_DOC_BY_JPK_ID,
  UserRole.EVENT_ORDER_CANCEL_FIRMWARE_UPGRADE,
  UserRole.EVENT_ORDER_MAKE_DAILY_REPORT,
  UserRole.EVENT_ORDER_MAKE_MONTHLY_REPORT,
  UserRole.EVENT_ORDER_CASH_BALANCE_REGISTER,
  UserRole.EVENT_ORDER_UPDATE_PROMOS,
  UserRole.EVENT_ORDER_SEND_DOCS_RANGE,
  UserRole.EVENT_ORDER_SEND_FILE_OR_DIRECTORY,
  UserRole.EVENT_ORDER_CANCEL_SEND_FILE_OR_DIRECTORY,
  UserRole.EVENT_ORDER_CHANGE_LOG_SETTINGS,
  UserRole.EVENT_ORDER_SET_DOC_FLAGS,
  UserRole.EVENT_ORDER_DEVICE_SETTINGS,
  UserRole.EVENT_ORDER_DELETE_FILE_OR_DIRECTORY,
  UserRole.EVENT_ORDER_DISPLAY_MESSAGE,
  UserRole.EVENT_ORDER_DOWNLOAD_FILE,
  UserRole.EVENT_ORDER_MAKE_NONFISCAL_PRINTOUT,
  UserRole.EVENT_ORDER_RESTART_DEVICE,
  UserRole.EVENT_ORDER_ADD_REMOTE_ACTION,
  UserRole.EVENT_ORDER_REMOVE_REMOTE_ACTION,
];

export const EVENTS: UserRole[] = [
  ...EVENTS_ORDER,
];

export const SUPPORT_FEEDBACK: UserRole[] = [
  UserRole.SUPPORT_USER_FEEDBACKS_GET_ADMIN_ID,
  UserRole.SUPPORT_USER_FEEDBACKS_GET_ADMIN,
];

export const SUPPORT: UserRole[] = [
  ...SUPPORT_FEEDBACK,
];

export const DEVICE_SETTINGS_SERVICE_LIST: UserRole[] = [
  UserRole.DEVICE_SETTINGS_SERVICE_GET_ADMIN,
  UserRole.DEVICE_SETTINGS_SERVICE_GET_ID_ADMIN,
];

export const DEVICE_SETTINGS_DEVICE_LIST: UserRole[] = [
  UserRole.DEVICE_SETTINGS_DEVICE_GET_ADMIN,
  UserRole.DEVICE_SETTINGS_DEVICE_GET_ID_ADMIN,
];

export const DEVICE_SETTINGS: UserRole[] = [
  ...DEVICE_SETTINGS_SERVICE_LIST,
  ...DEVICE_SETTINGS_DEVICE_LIST
];

export const TRANSACTIONS_LIST: UserRole[] = [
  UserRole.PAYMENT_ROUTER_TRANSACTION_GET_ADMIN,
];

export const TRANSACTIONS_METRICS: UserRole[] = [
  UserRole.PAYMENT_ROUTER_TRANSACTION_GET_ADMIN,
];

export const TRANSACTIONS_DEVICES: UserRole[] = [
  UserRole.PAYMENT_ROUTER_TRANSACTION_GET_ADMIN,
];

export const TRANSACTIONS_HOPSHOP_TRANSACTIONS: UserRole[] = [
  UserRole.HOPSHOP_PAYMENT_BRIDGE_TRANSACTION_GET_ADMIN,
];

export const TRANSACTIONS_HOPSHOP_DEVICES: UserRole[] = [
  UserRole.HOPSHOP_PAYMENT_BRIDGE_DEVICE_GET_ADMIN,
];

export const TRANSACTIONS_HOPSHOP_CALLBACKS: UserRole[] = [
  UserRole.HOPSHOP_PAYMENT_BRIDGE_CALLBACK_GET_ADMIN,
];

export const TRANSACTIONS_PAYTEL_TRANSACTIONS: UserRole[] = [
  UserRole.PAYTEL_BRIDGE_TRANSACTION_GET_ADMIN,
];

export const TRANSACTIONS_PAYTEL_DEVICES: UserRole[] = [
  UserRole.PAYTEL_BRIDGE_DEVICE_GET_ADMIN,
];

export const TRANSACTIONS: UserRole[] = [
  ...TRANSACTIONS_LIST,
  ...TRANSACTIONS_METRICS,
  ...TRANSACTIONS_DEVICES,
  ...TRANSACTIONS_HOPSHOP_TRANSACTIONS,
  ...TRANSACTIONS_HOPSHOP_DEVICES,
  ...TRANSACTIONS_HOPSHOP_CALLBACKS,
  ...TRANSACTIONS_PAYTEL_TRANSACTIONS,
  ...TRANSACTIONS_PAYTEL_DEVICES,
];

export const FIRMWARE_VERSIONS: UserRole[] = [
  //TODO DODAC ROLE
];

export const UPLOAD_NEW_FIRMWARE: UserRole[] = [
  //TODO DODAC ROLE
];

export const FIRMWARE_UPGRADE: UserRole[] = [
  ...FIRMWARE_VERSIONS,
  ...UPLOAD_NEW_FIRMWARE,
];

export const STX_CREATE_WEBSOCKET_SESSION: UserRole[] = [
  UserRole.STX_WEBSOCKET_SESSION_GET_ADMIN,
];

export const STX: UserRole[] = [
  ...STX_CREATE_WEBSOCKET_SESSION
];

export const INTEGRATOR_DASHBOARD: UserRole[] = [
  UserRole.LICENSING_BRIDGE_USERS_SERVICES_GET,
  UserRole.LICENSING_BRIDGE_DEVICES_SERVICES_GET,
  UserRole.LICENSING_BRIDGE_SERVICES_DEFINITIONS_GET,
];

export const INTEGRATOR_USERS: UserRole[] = [
  UserRole.LICENSING_BRIDGE_USERS_SERVICES_GET,
];

export const INTEGRATOR_DEVICES: UserRole[] = [
  UserRole.LICENSING_BRIDGE_DEVICES_SERVICES_GET,
];

export const INTEGRATOR_BILLING: UserRole[] = [
  UserRole.LICENSING_BRIDGE_INTEGRATOR_BILLING_GET,
];

export const INTEGRATOR_ACCESS: UserRole[] = [
  UserRole.LICENSING_BRIDGE_SERVICE_SUPERVISOR_LINK,
  UserRole.LICENSING_BRIDGE_SERVICE_SUPERVISOR_UNLINK,
];

export const INTEGRATOR_ORDERS: UserRole[] = [
  UserRole.LICENSING_BRIDGE_USER_LICENSE_ORDERS_GET_INTEGRATOR,
];

export const INTEGRATOR: UserRole[] = [
  ...INTEGRATOR_DASHBOARD,
  ...INTEGRATOR_USERS,
  ...INTEGRATOR_DEVICES,
  ...INTEGRATOR_BILLING,
  ...INTEGRATOR_ACCESS,
];

export const TAXI_ORDERS_LIST: UserRole[] = [
  UserRole.LICENSING_BRIDGE_ORDERS_GET_ADMIN,
];

export const TAXI: UserRole[] = [
  ...TAXI_ORDERS_LIST,
  ...INTEGRATOR_ORDERS,
];