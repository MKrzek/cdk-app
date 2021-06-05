#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkAppStack } from '../lib/cdk-app-stack';

const app = new cdk.App();
new CdkAppStack(app, 'CdkAppStack');
