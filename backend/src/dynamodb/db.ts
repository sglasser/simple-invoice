import { Invoice } from '../models/invoice';
import { User } from '../models/User';
import { Recipient } from '../models/recipient';
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
  async updateInvoice(updatedInvoice: Invoice) {
    this.logger.info('update invoice', updatedInvoice.invoiceId);
    return this.docClient.update({
      TableName: process.env.INVOICE_TABLE,
      UpdateExpression: 'set lineItems = :li',
      ExpressionAttributeValues: {
        ':li': updatedInvoice.lineItems
      },
      Key: {"userId": updatedInvoice.invoiceId, "invoiceId": updatedInvoice.invoiceId}
    }).promise();
  }

  async createUser(user: User) {
    this.logger.info('create user', user);
    return this.docClient.put({
      TableName: process.env.USER_TABLE,
      Item: user
    }).promise();
  }

  async getUser(userId): Promise<User[]> {
    this.logger.info('getUser', userId);
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
  async updateUser(updatedUser: User) {
    this.logger.info('update user', updatedUser.userId);
    return this.docClient.update({
      TableName: process.env.USER_TABLE,
      UpdateExpression: 'set company = :n',
      ExpressionAttributeValues: {
        ':n': updatedUser.company
      },
      Key: { "userId": updatedUser.userId}
    }).promise();
  }

  async createRecipient(recipient: Recipient) {
    this.logger.info('create recipient', recipient);
    return this.docClient.put({
      TableName: process.env.RECIPIENT_TABLE,
      Item: recipient
    }).promise();
  }

  async getRecipients(userId): Promise<Recipient[]> {
    this.logger.info('get recipients', userId);
    const result = await this.docClient.query({
      TableName: process.env.RECIPIENT_TABLE,
      KeyConditionExpression: 'userId = :u',
      ExpressionAttributeValues: {
        ':u': userId
      }
    }).promise();
    return result.Items as Recipient[];
  }

  // TODO added all recipient fields to update
  async updateRecipient(updatedRecipient: Recipient) {
    this.logger.info('update recipient', updatedRecipient.recipientId);
    return this.docClient.update({
      TableName: process.env.RECIPIENT_TABLE,
      UpdateExpression: 'set company = :n',
      ExpressionAttributeValues: {
        ':n': updatedRecipient.company
      },
      Key: { "recipientId": updatedRecipient.recipientId}
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