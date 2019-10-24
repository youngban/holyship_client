## Holyship 프로젝트는?
Holyship 프로젝트는 사용자들이 직접 DJ가 되서 감정을 기반으로 음악을 추천해주는 SNS서비스 입니다.

### 기능별 진행단계 
Minimum
- 로그인 & 회원가입
- API를 통해서 음원정보 가져오기
- 게시글 작성
- 댓글
- PlayList

Advanced
- 팔로우 & 좋아요
- 차트 
- 녹음기능
- 플레이리스트 공유
- 음악 재생

Nightmare
- 댓글 기준으로 리스트 만들기
- 노래추천(AWS personalize 사용 음악추천)
- 음악취향분석
- 좋아하는 가수/장르 별로 필터링하기

### 사용한 스택
Front : ReactNative, React-Navigation, TypeScript, JWT, UI Kitten, Expo  
Back : AWS, EC2, S3, Mysql, Sequelize, Amazon RDS, Passport

- 회원가입  
![user_signup.gif](https://images.velog.io/post-images/qksud14/b86af8a0-f5fd-11e9-9e2c-7d4c8c38bd49/usersignup.gif)

- 로그인  
![user_login.gif](https://images.velog.io/post-images/qksud14/c1f83130-f5fd-11e9-9e2c-7d4c8c38bd49/userlogin.gif)

- 피드  
![view_post](https://user-images.githubusercontent.com/40445771/67447051-9d17ad00-f64d-11e9-9aad-0ade44615d40.gif)

- 포스팅  
![posting](https://user-images.githubusercontent.com/40445771/67447068-a7d24200-f64d-11e9-82f1-0e716c196fbf.gif)

- 코멘트  
![comment](https://user-images.githubusercontent.com/40445771/67447072-aacd3280-f64d-11e9-9bf7-f4d5c750b46e.gif)

- 플레이리스트 / 노래재생  
![add_playlist](https://user-images.githubusercontent.com/40445771/67447073-ad2f8c80-f64d-11e9-947a-55dabadeaeaa.gif)

- 프로필 변경  
![change_profile.gif](https://images.velog.io/post-images/qksud14/81dec770-f5fe-11e9-ae86-f7f42c038cd6/changeprofile.gif)

- 팔로우  
![follow.gif](https://images.velog.io/post-images/qksud14/4ac0e820-f600-11e9-9e2c-7d4c8c38bd49/follow.gif)
