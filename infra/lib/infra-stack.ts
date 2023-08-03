import {RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const webBucket = new Bucket(this, 'webBucket', {
      bucketName: "jag8765-web-bucket",
       autoDeleteObjects: true,
       publicReadAccess: true,
       websiteIndexDocument: 'index.html',
       websiteErrorDocument: 'index.html',
       removalPolicy: RemovalPolicy.DESTROY,
    });

    webBucket.addToResourcePolicy(new PolicyStatement({
      actions: ['s3:GetObject'],
      effect: Effect.ALLOW,
      principals: [new AnyPrincipal()],
      resources: [`${webBucket.bucketArn}/*`]
    }));
  }
}
