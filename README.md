# Summit2020-mobile


## 0. Prerequisites
Setting up the development environment

a. Make sure you have a recent version of <a href="https://nodejs.org/en/" target="_blank" rel="nofollow noopener noreferrer">Node.js</a> and <a href="https://classic.yarnpkg.com/en/docs/install/#mac-stable" target="_blank" rel="nofollow noopener noreferrer">yarn</a> installed.


b. For react app development, install the <a href="https://create-react-app.dev/docs/getting-started"  target="_blank" rel="nofollow noopener noreferrer"> create-react-app </a> package using npm install -g create-react-app

c. For react native app development, this <a href="https://reactnative.dev/docs/environment-setup"  target="_blank" rel="nofollow noopener noreferrer">page </a> will help you install necessary tools to build.



## 1. Amplify CLI Install
  a. The Amplify Command Line Interface (CLI) is a unified toolchain to create AWS cloud services for your app.

    
    npm install -g @aws-amplify/cli
     
  b. Configure Amplify
    
    amplify configure
    

<br>

## 2. [WEB] React Web without Cloud Sync
  This react web application has a stand-alone local datastore, with no connection to the cloud, or the need to have an AWS Account.
  
  a. To set up the project, we’ll first create a new React app with create-react-app.
  
    npx create-react-app summitweb --use-npm
  
  
  b. Change Directory.
  
    cd summitweb
  
  c. Run npx amplify-app@latest
  
    npx amplify-app@latest


  d. Replace contents of amplify/backend/api/amplifyDatasource/schema.graphql file with the following,

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


  e. Generate the source code representing the model
       
     npm run amplify-modelgen 


  f. Install a datastore lib.
        
       npm i @aws-amplify/core @aws-amplify/datastore

  g. Copy copyfile/web-copy/App.css and App.js to your src ( summitweb/src/App.cs, App.js )
  
  h. Start web application 
  
      yart start
      
<br>

## 3. [WEB] Sync with the cloud
 You can start syncing with the cloud by provisioning a backend from your project.
 
  a. Provisions cloud resources. 
    
    npm run amplify-push ( or amplify push)

  b. Add codes to App.js file. 
  
    import Amplify from "@aws-amplify/core";
    import awsconfig from "./aws-exports";
    Amplify.configure(awsconfig);

<br>

## 4. [APP]React Native App (share with web app’s backend )

  a. Create a new React Native app with following command. 
    
    react-native init summitapp
  
  b. Change directory. 
  
    cd summitapp


  c. Install dependencies. 
  
    npm i @aws-amplify/core @aws-amplify/datastore @react-native-community/netinfo
    
    npm install native-base --save
    
    cd ios && pod install && cd ..
  
  f. Pulls down the latest backend environment(react web app's) to your local development.
    
    amplify pull 

  g. Generate the source code representing the model
    
    amplify codegen models
  
  h. Copy copyfile/app-copy/CardComponent.js and App.js to your src ( summitapp/src/CardComponent.js, summitapp/App.js )
  
  i. Add codes to App.js 

    import Amplify from '@aws-amplify/core';
    import awsConfig from './aws-exports';
    Amplify.configure(awsConfig);
    
  j. Start application 
    
    npx react-native run-ios

<br>

## 5. [WEB] Add AI/ML (Predictions)

  a. Add prdictions category (with auth)
  
    amplify add predictions 
  
  b. Provisions cloud resources.
  
    amplify push

  c. Install dependencies.
    
    npm i @aws-amplify/predictions

  d. Insert codes to App.js
  
    import TextTranslation from "./TextTranslation";
    <TextTranslation id={posts[i].id} body={posts[i].body} />
    
  e. Copy copyfile/web-copy/TextTranslation.js file to your src (summitweb/src/TextTranslation.js)
