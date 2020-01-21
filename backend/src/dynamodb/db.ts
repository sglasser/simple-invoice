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

  async getMaxInvoiceNumber(userId): Promise<Invoice> {
    // https://www.dynamodbguide.com/local-secondary-indexes
    this.logger.info('getMaxInvoiceNumber', userId);
    const result = await this.docClient.query({
      TableName: process.env.INVOICE_TABLE,
      KeyConditionExpression: 'userId = :u',
      ExpressionAttributeValues: {
        ':u' : userId
      },
      ScanIndexForward: false
    }).promise();
    this.logger.info('getMaxInvoiceNumber', JSON.stringify(result))
    return result.Items[0];
  }

  async updateInvoice(updatedInvoice: Invoice) {
    this.logger.info('update invoice', updatedInvoice.invoiceId);
    return this.docClient.update({
      TableName: process.env.INVOICE_TABLE,
      UpdateExpression: 'set lineItems = :li, recipient = :r, due = :d, paid = :p, dueYear = :dy, dueMonth = :dm, attachmentUrl = :url',
      ExpressionAttributeValues: {
        ':li': updatedInvoice.lineItems,
        ':r': updatedInvoice.recipient,
        ':d': updatedInvoice.due,
        ':p': updatedInvoice.paid,
        ':dy': updatedInvoice.dueYear,
        ':dm': updatedInvoice.dueMonth,
        ':url': 'TEST URL'

      },
      Key: {"userId": updatedInvoice.userId, "invoiceId": updatedInvoice.invoiceId}
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

  async updateUser(updatedUser: User) {
    this.logger.info('update user', updatedUser.userId);
    return this.docClient.update({
      TableName: process.env.USER_TABLE,
      UpdateExpression: 'set company = :n, address = :a, city = :c, stateprov = :s, postal = :po, phone = :ph, email = :e',
      ExpressionAttributeValues: {
        ':n': updatedUser.company,
        ':a': updatedUser.address,
        ':c': updatedUser.city,
        ':s': updatedUser.stateprov,
        ':po': updatedUser.postal,
        ':ph': updatedUser.phone,
        ':e': updatedUser.email
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

  async updateRecipient(updatedRecipient: Recipient) {
    this.logger.info('update recipient', updatedRecipient.recipientId);
    return this.docClient.update({
      TableName: process.env.RECIPIENT_TABLE,
      UpdateExpression: 'set company = :n, address = :a, city = :c, stateprov = :s, postal = :po, phone = :ph, email = :e',
      ExpressionAttributeValues: {
        ':n': updatedRecipient.company,
        ':a': updatedRecipient.address,
        ':c': updatedRecipient.city,
        ':s': updatedRecipient.stateprov,
        ':po': updatedRecipient.postal,
        ':ph': updatedRecipient.phone,
        ':e': updatedRecipient.email
      },
      Key: { "recipientId": updatedRecipient.recipientId}
    }).promise();
  }
}