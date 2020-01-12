//import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Invoice } from '../models/Invoice';
import { User } from '../models/User';
import * as AWSXRay from 'aws-xray-sdk';
import * as AWS from 'aws-sdk';
import { createLogger } from '../utils/logger';

export class Db {

  private static instance: Db;
  docClient;
  logger = createLogger('Db');

  constructor() {
    const XAWS = AWSXRay.captureAWS(AWS);
    this.docClient = new XAWS.DynamoDB.DocumentClient();
  }

  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  async createInvoice(invoice: Invoice) {
    this.logger.info('create invoice', invoice);
    return this.docClient.put({
      TableName: process.env.INVOICE_TABLE,
      Item: invoice
    }).promise();
  }

  async getInvoices(userId): Promise<Invoice[]> {
    this.logger.info('getInvoices', userId);
    const result = await this.docClient.query({
      TableName: process.env.INVOICE_TABLE,
      KeyConditionExpression: 'userId = :u',
      ExpressionAttributeValues: {
        ':u': userId
      }
    }).promise();
    return result.Items as Invoice[];
  }

  // TODO - add all fields to update
  async updateInvoice(updatedInvoice: Invoice, userId: string, invoiceId: string) {
    this.logger.info('update', userId, invoiceId);
    return this.docClient.update({
      TableName: process.env.INVOICE_TABLE,
      UpdateExpression: 'set lineItems = :li',
      ExpressionAttributeValues: {
        ':li': updatedInvoice.lineItems
      },
      Key: { "userId": userId, "invoiceId": invoiceId}
    }).promise();
  }

  async createUser(user: User) {
    this.logger.info('create user', user);
    return this.docClient.put({
      TableName: process.env.USER_TABLE,
      Item: user
    }).promise();
  }

  async getUsers(userId): Promise<User[]> {
    this.logger.info('getUsers', userId);
    const result = await this.docClient.query({
      TableName: process.env.USER_TABLE,
      KeyConditionExpression: 'userId = :u',
      ExpressionAttributeValues: {
        ':u': userId
      }
    }).promise();
    return result.Items as User[];
  }

  // TODO added all user fields to update
  async updateUser(updatedUser: User, userId: string, recipientId: string) {
    this.logger.info('updateUser', userId, recipientId);
    return this.docClient.update({
      TableName: process.env.USER_TABLE,
      UpdateExpression: 'set name = :n',
      ExpressionAttributeValues: {
        ':n': updatedUser.name
      },
      Key: { "userId": userId, "recpientId": updatedUser.recipientId}
    }).promise();
  }

  // async save(todo: TodoItem) {
  //   this.logger.info('save', todo);
  //   return this.docClient.put({
  //     TableName: process.env.TODOS_TABLE,
  //     Item: todo
  //   }).promise();
  // }

  // async update(updatedTodo: UpdateTodoRequest, userId: string, todoId: string) {
  //   this.logger.info('update', userId, todoId);
  //   return this.docClient.update({
  //     TableName: process.env.TODOS_TABLE,
  //     UpdateExpression: 'set done = :d',
  //     ExpressionAttributeValues: {
  //       ':d': updatedTodo.done
  //     },
  //     Key: { "userId": userId, "todoId": todoId}
  //   }).promise();
  // }

  // async updateUrl(url: string, userId: string, todoId: string) {
  //   this.logger.info('update', url, userId, todoId);
  //   return this.docClient.update({
  //     TableName: process.env.TODOS_TABLE,
  //     UpdateExpression: 'set attachmentUrl = :u',
  //     ExpressionAttributeValues: {
  //       ':u': url
  //     },
  //     Key: { "userId": userId, "todoId": todoId}
  //   }).promise();
  // }

  // async delete(userId: string, todoId: string) {
  //   this.logger.info('delete', userId, todoId);
  //   return this.docClient.delete({
  //     TableName: process.env.TODOS_TABLE,
  //     Key: { "userId": userId, "todoId": todoId}
  //   }).promise();
  // }
}