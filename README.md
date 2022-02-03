# 💘 MateMate ? 
- 밥 혼자 먹기 싫을 때, 혼자 먹기엔 많을 때! 함께 밥 먹을 수 있는 Mate를 만날 수 있는 소셜 네트워크 플랫폼  
- 같이 먹고 싶은 Mate들 모두 모여! 
- 2021.08 develop START! 

# 💗 Project Design
<img src = https://user-images.githubusercontent.com/50194490/151659830-f33afd42-ba94-414b-935b-7f0cfecf6d20.jpg width="70%">

# 🐰 About Team Rabbit-Squad 
| 이름  | 포지션 |
|------|----------|
|[최다연](https://github.com/dayeondayeon)|Android, Server Developer | 
|[한현빈](https://github.com/Happiva)|Android, Server Developer |  

# 🧡 Project Architecture  
<img src = https://user-images.githubusercontent.com/50194490/151607556-53183285-e6ff-4b5f-96c9-96ad703618a7.jpg width="70%">


# 💛 Library  
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


# 💚 [MateMate API](https://github.com/Rabbit-Squad/MateMate_BackEnd/wiki)
| 메소드 | 경로 | 설명 | 담당자 |
| ------ | ---- | ---- | ----- |
| POST | /signin | 이메일, 패스워드로 로그인 | 최다연 |
| POST | /join | 닉네임, 이메일, 패스워드로 회원가입 | 한현빈 |
| GET | /list | 모든 유저들의 전체 글 조회 | 최다연 | 
| GET | /list/:userIdx | 내가 작성한 글 조회 | 최다연 |
| POST | /post | 모집글 작성하기 | 한현빈 |
| POST | /request/:postIdx | 모집글에 참여 신청 | 최다연 |
| GET | /request/mypost/:userIdx | 내 게시글 신청자 조회 | 최다연 |
| POST | /approval/:reqIdx | 내 게시글 신청자의 신청 승인 or 거절 | 한현빈 |
| GET | /profile/:userIdx | 내 계정 정보 조회 | 한현빈 |
| DELETE | /profile/delete/:userIdx	| 회원 탈퇴 | 한현빈 |

# 💙 ERD 
<img src = https://user-images.githubusercontent.com/50194490/151604858-109db8fc-417c-45cb-a8c4-04ecf6b3313a.jpg width="70%">


# 💜 Commit Message Rules 
- 가능한 50자를 넘지 않게, 간단하지만 명료한 형태로 작성 
- (Commit Message) : (수정/작업한 부분에 대한 설명)의 형태로 작성  
- **✍🏻Commit Message List**  

    - Docs : 문서 편집 및 작성 
    - Fix : 버그 수정
    - Feat : 새로운 기능 구현
    - Modify : 기능 수정
    - Refactor : 리팩토링, 코드 수정(기능이 동일할 경우)
