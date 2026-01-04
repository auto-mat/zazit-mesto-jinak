# Router rules

## List of variables relevant for routing user (allowed-disallowed pages)

- user is logged in
- user email is verified
- user is fully registered

## List of access types (sets of allowed-disallowed pages)

- login (login, sign up, confirm email, password)
- verify email (only)
- registration (only)
- app full (home, events, profile)

| Logged in | Email Verified | Registration Complete |    Access    |
| :-------: | :------------: | :-------------------: | :----------: |
|     ✗     |       -        |           -           |    login     |
|     ✓     |       ✗        |           -           | verify email |
|     ✓     |       ✓        |           ✗           | registration |
|     ✓     |       ✓        |           ✓           |   app full   |
