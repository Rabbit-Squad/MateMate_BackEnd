# π MateMate ? 
- λ°₯ νΌμ λ¨ΉκΈ° μ«μ λ, νΌμ λ¨ΉκΈ°μ λ§μ λ! ν¨κ» λ°₯ λ¨Ήμ μ μλ Mateλ₯Ό λ§λ  μ μλ μμ λ€νΈμν¬ νλ«νΌ  
- κ°μ΄ λ¨Ήκ³  μΆμ Mateλ€ λͺ¨λ λͺ¨μ¬! 
- 2021.08 develop START! 
- [MateMate_FrontEnd](https://github.com/Rabbit-Squad/MateMate_FrontEnd)

# π Project Design
<img src = https://user-images.githubusercontent.com/50194490/151659830-f33afd42-ba94-414b-935b-7f0cfecf6d20.jpg width="70%">

# π° About Team Rabbit-Squad 
| μ΄λ¦  | ν¬μ§μ |
|------|----------|
|[μ΅λ€μ°](https://github.com/dayeondayeon)|Android, Server Developer | 
|[ννλΉ](https://github.com/Happiva)|Android, Server Developer |  

# π§‘ Project Architecture  
<img src = https://user-images.githubusercontent.com/50194490/151607556-53183285-e6ff-4b5f-96c9-96ad703618a7.jpg width="70%">


# π Library  
```
- bcrypt@5.0.1
- body-parser@1.19.0
- cookie-parser@1.4.5
- dotenv@10.0.0
- express@4.17.1
- express-session@1.17.2
- jsonwebtoken@8.5.1
- morgan@1.10.0
- multer@1.4.3
- mysql@2.18.1
- mysql2@2.3.0
- nodemon@2.0.12
- nunjucks@3.2.3
- pm2@5.1.1
```


# π [MateMate API](https://github.com/Rabbit-Squad/MateMate_BackEnd/wiki)
| λ©μλ | κ²½λ‘ | μ€λͺ | λ΄λΉμ |
| ------ | ---- | ---- | ----- |
| POST | /signin | μ΄λ©μΌ, ν¨μ€μλλ‘ λ‘κ·ΈμΈ | μ΅λ€μ° |
| POST | /join | λλ€μ, μ΄λ©μΌ, ν¨μ€μλλ‘ νμκ°μ | ννλΉ |
| GET | /list | λͺ¨λ  μ μ λ€μ μ μ²΄ κΈ μ‘°ν | μ΅λ€μ° | 
| GET | /list/:userIdx | λ΄κ° μμ±ν κΈ μ‘°ν | μ΅λ€μ° |
| POST | /post | λͺ¨μ§κΈ μμ±νκΈ° | ννλΉ |
| POST | /request/:postIdx | λͺ¨μ§κΈμ μ°Έμ¬ μ μ²­ | μ΅λ€μ° |
| GET | /request/mypost/:userIdx | λ΄ κ²μκΈ μ μ²­μ μ‘°ν | μ΅λ€μ° |
| POST | /approval/:reqIdx | λ΄ κ²μκΈ μ μ²­μμ μ μ²­ μΉμΈ or κ±°μ  | ννλΉ |
| GET | /profile/:userIdx | λ΄ κ³μ  μ λ³΄ μ‘°ν | ννλΉ |
| DELETE | /profile/delete/:userIdx	| νμ νν΄ | ννλΉ |

# π ERD 
<img src = https://user-images.githubusercontent.com/50194490/151604858-109db8fc-417c-45cb-a8c4-04ecf6b3313a.jpg width="70%">


# π Commit Message Rules 
- κ°λ₯ν 50μλ₯Ό λμ§ μκ², κ°λ¨νμ§λ§ λͺλ£ν ννλ‘ μμ± 
- (Commit Message) : (μμ /μμν λΆλΆμ λν μ€λͺ)μ ννλ‘ μμ±  
- **βπ»Commit Message List**  

    - Docs : λ¬Έμ νΈμ§ λ° μμ± 
    - Fix : λ²κ·Έ μμ 
    - Feat : μλ‘μ΄ κΈ°λ₯ κ΅¬ν
    - Modify : κΈ°λ₯ μμ 
    - Refactor : λ¦¬ν©ν λ§, μ½λ μμ (κΈ°λ₯μ΄ λμΌν  κ²½μ°)
