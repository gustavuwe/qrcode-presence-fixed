
# Attendance system using qr-code technology

###  The project aims to optimize the presence of students/professionals at an institution, providing greater efficiency for the task carried out.

--------

### Motivation: time spent and lack of efficiency in ensuring the presence of students on the IFRN campus

--------

Locations that have been/are being implemented:


* IFRN - Campus Currais Novos (Instituto Federal de Ciencia e Tecnologia do Rio Grande do Norte)

----------

### 🤔 How it works?

#### 1. The person responsible generates a QR-Code using our API
![image](https://github.com/gustavuwe/qrcode-presence-backup/assets/90202107/accc570b-eaf8-41e8-a905-d11198add2ab)


#### 2. Students scan the QR-Code and are redirected to this page, where they fill in their enrollment and register their presence
![image](https://github.com/gustavuwe/qrcode-presence-backup/assets/90202107/5e0fa221-f697-44aa-b441-700150ae6be6)

#### 3. After that, a call is made to our API and the student's presence is applied after the teacher closes availability.

#### 🤩 And that's it, the presence is done!

------

## 📈Technologies used:

* NodeJS - Fastify as microservice
* Typescript
* PostgreSQL - DrizzleORM as a query tool
* ReactJS
* Docker for isolated containers

------

Developed by: Gustav Junghans, Levi Navlig, Tarcísio Neto, Wellington Eduardo and Pietro
