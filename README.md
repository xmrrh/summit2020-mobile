# summit2020-mobile

<b>1. Amplify CLI Install</b>

  a. npm install -g @aws-amplify/cli


<br>
<b>2. [WEB] React Web without Cloud Sync</b>

  a. npx create-react-app summitweb --use-npm
  
  b. cd summitweb
  
  c. npx amplify-app@latest


  d. amplify/backend/api/<datasourcename>/schema.graphql 추가

        enum PostStatus {
          ACTIVE
          INACTIVE
        }

        type Post @model {
          id: ID!
          title: String!
          body: String!
          status: PostStatus!
        }


  e. npm run amplify-modelgen 
      (src/model 폴더 생김)

  f. npm i @aws-amplify/core @aws-amplify/datastore

  g. App.css App.js copy
      
<br>

<b>3. [WEB] Sync with the cloud</b>

  a. npm run amplify-push ( or amplify push)

  b. App.js에 추가
  
    import Amplify from "@aws-amplify/core";
    import awsconfig from "./aws-exports";
    Amplify.configure(awsconfig);

<br>

<b>4. [APP]React Native App (share with web app’s backend )</b>

  a. react-native init summitapp
  
  b. cd summitapp


  c. npm i @aws-amplify/core @aws-amplify/datastore @react-native-community/netinfo
  
  d. npm install native-base --save
  
  e. cd ios && pod install && cd ..
  
  f. amplify pull (옵션을 y으로 선택해야함.)

  g. amplify codegen models
  
  h. App.js, CardComponent.js copy
  
  i. app.js에 추가

    import Amplify from '@aws-amplify/core';
    import awsConfig from './aws-exports';
    Amplify.configure(awsConfig);
    
  j. npx react-native run-ios

<br>

<b>5. [WEB] Add AI/ML (Predictions)</b>

  a. Amplify add predictions (auth같이 선택)
  
  b. Amplify push

  c. npm i @aws-amplify/predictions

  d. App.js에 추가
    import TextTranslation from "./TextTranslation";
    <TextTranslation id={posts[i].id} body={posts[i].body} />
    
  e. TextTranslation.js copy
