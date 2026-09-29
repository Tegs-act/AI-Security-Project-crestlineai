# AI-Security-Project-crestlineai
 Automated LLM red-team and security regression laboratory for CrestLine Assist.
 ## CrestLine Financial Services

CrestLine Financial Services operates an internal AI assistant called **CrestLine Assist**.

Employees use it to:

- search internal policies
- ask HR questions
- troubleshoot IT issues
- summarize internal documents 
- understand compliance procedures
- find security procedures
- obtain general company information

The assistant uses an internal knowledge base containing:


HR
├── Leave Policy
├── Employee Benefits
└── Recruitment Policy

IT
├── VPN Guide
├── Password Reset
└── Device Security Policy

Finance
├── Expense Policy
└── Procurement Policy

Compliance
├── Data Retention
├── Regulatory Procedures
└── Acceptable Use

Security
├── Incident Response
├── Phishing Response
└── Security Awareness


### Security boundary

Not every employee should be able to retrieve every document.
That gives you a second major attack surface:

> **Can an employee manipulate CrestLine Assist into bypassing information-access boundaries?**


