
import *  as cdk from '@aws-cdk/core';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as s3 from "@aws-cdk/aws-s3";

import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import { ToDoBackend } from "./todo-backend";





export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const toDoBackend = new ToDoBackend(this, 'ToDoBackend')


    // const helloLambda = new lambda.Function(this, 'HelloLambda', {
    //   code: lambda.Code.fromAsset('lambda'),
    //   handler: 'hello.handler',
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   memorySize: 256,
    //   timeout: Duration.seconds(30),
    //   environment: {
    //     isProduction: 'Not is not'
    //   }
    // })
    new apiGateway.LambdaRestApi(this, 'Endpoint', {
      handler: toDoBackend.handler
    })

    // const logoBucket = new s3.Bucket(this, 'LogoBucket', {
    //   publicReadAccess: true
    // });

    // logoBucket.addEventNotification(
    //   s3.EventType.OBJECT_CREATED,
    //   new s3Notifications.LambdaDestination(helloLambda)
    // );

    // new s3Deployment.BucketDeployment(this, "DeployLogo", {
    //   destinationBucket: logoBucket,
    //   sources: [s3Deployment.Source.asset("./assets")]
    // })
  }
}
