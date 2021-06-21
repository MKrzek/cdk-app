
import AWS = require('aws-sdk');
import { v4 as uuid } from 'uuid';
const tableName = process.env.TABLE_NAME ?? "";
const dynamodb = new AWS.DynamoDB.DocumentClient();


const createResponse = (
    body: string | AWS.DynamoDB.DocumentClient.ItemList,
    statusCode = 200
) => ({
    statusCode,
    body: JSON.stringify(body, null, 2)
})
const getAllTodos = async () =>
    await dynamodb.scan({
        TableName: tableName
    }).promise()


const addTodoItem = async (data: { todo: string, id: string }) => {
    const { id, todo } = data
    if (todo && todo !== "") {
        await dynamodb.put({
            TableName: tableName,
            Item: {
                id: id || uuid(),
                todo
            }
        }).promise()
    }
    return todo
}
const deleteTodoItem = async (data: { id: string }) => {
    const { id } = data
    if (id && id !== "") {
        await dynamodb.delete({
            TableName: tableName,
            Key: {
                id
            }
        }).promise()
    }
    return id


}

exports.handler = async function (event: AWSLambda.APIGatewayEvent) {
    try {
        const { httpMethod, body: requestBody } = event
        if (httpMethod === "GET") {
            const response = await getAllTodos();
            console.log('xxxx-response', response)
            return createResponse(response?.Items ?? []);
        }

        if (requestBody == null) {
            return createResponse('missing request body', 500)
        }
        const data = JSON.parse(requestBody)

        if (httpMethod === "POST") {
            const todo = await addTodoItem(data)

            return todo ? createResponse(`${todo} added to the database`)
                : createResponse('Todo is  missing', 500)
        }
        if (httpMethod === 'DELETE') {
            const id = await deleteTodoItem(data)
            return id ? createResponse(`Todo item with id: ${id} was delted`) : createResponse("ID missing", 500)
        }

        return createResponse(`We only accept GET,POST, OPTIONS, and DELETE request for now, not ${httpMethod}`);
    }
    catch (error) {
        console.log('error', error);
        return createResponse(error, 500);
    }
}