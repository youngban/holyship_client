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
![view_post.gif](https://images.velog.io/post-images/qksud14/e50dab00-f5fd-11e9-8db7-4123832bedd7/viewpost.gif)

- 포스팅
![posting.gif](https://images.velog.io/post-images/qksud14/390591d0-f600-11e9-91c1-b56aa27e15be/posting.gif)

- 코멘트
![comment.gif](https://images.velog.io/post-images/qksud14/ccc2b9d0-f5ff-11e9-9e2c-7d4c8c38bd49/comment.gif)

- 플레이리스트 / 노래재생
![add_playlist.gif](https://images.velog.io/post-images/qksud14/3db4ace0-f5fe-11e9-ae86-f7f42c038cd6/addplaylist.gif)

- 프로필 변경
![change_profile.gif](https://images.velog.io/post-images/qksud14/81dec770-f5fe-11e9-ae86-f7f42c038cd6/changeprofile.gif)

- 팔로우
![follow.gif](https://images.velog.io/post-images/qksud14/4ac0e820-f600-11e9-9e2c-7d4c8c38bd49/follow.gif)
