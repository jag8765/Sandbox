import {RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import path = require('path');

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

    const playersTable = new Table(this, 'playersTable', {
      tableName: 'playersTable',
      partitionKey: { name: 'player_id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY
    })

    const gamesTable = new Table(this, 'gamesTable', {
      tableName: 'gamesTable',
      partitionKey: { name: 'game_id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY
    })

    const setupLambda = new Function(this, 'setupLambda', {
      functionName: 'setupLambda',
      handler: 'setup.lambda_handler',
      runtime: Runtime.PYTHON_3_11,
      code: Code.fromAsset(path.join(__dirname, '../../lambda/setup')),
    })
    setupLambda.addToRolePolicy(new PolicyStatement({
      actions: [
				"dynamodb:PutItem",
				"dynamodb:DescribeTable",
				"dynamodb:ListTables",
				"dynamodb:UpdateTable",
        "dynamodb:Scan"
      ],
      effect: Effect.ALLOW,
      resources: [gamesTable.tableArn, playersTable.tableArn]
    }));

    const loginLambda = new Function(this, 'loginLambda', {
      functionName: 'loginLambda',
      handler: 'login.lambda_handler',
      runtime: Runtime.PYTHON_3_11,
      code: Code.fromAsset(path.join(__dirname, '../../lambda/login')),
    })
    loginLambda.addToRolePolicy(new PolicyStatement({
      actions: [
				"dynamodb:DescribeTable",
				"dynamodb:ListTables",
				"dynamodb:GetItem",
				"dynamodb:Scan",
				"dynamodb:Query",
      ],
      effect: Effect.ALLOW,
      resources: [gamesTable.tableArn, playersTable.tableArn]
    }));

    const gameLambda = new Function(this, 'gameLambda', {
      functionName: 'gameLambda',
      handler: 'game.lambda_handler',
      runtime: Runtime.PYTHON_3_11,
      code: Code.fromAsset(path.join(__dirname, '../../lambda/game')),
    })
    gameLambda.addToRolePolicy(new PolicyStatement({
      actions: [
				"dynamodb:PutItem",
				"dynamodb:DescribeTable",
				"dynamodb:ListTables",
				"dynamodb:GetItem",
				"dynamodb:Scan",
				"dynamodb:Query",
				"dynamodb:UpdateItem",
				"dynamodb:DeleteTable",
				"dynamodb:UpdateTable",
      ],
      effect: Effect.ALLOW,
      resources: [gamesTable.tableArn, playersTable.tableArn]
    }));
  }
}
