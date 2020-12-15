import handler from "./libs/handler-lib";
import dynamoDB from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {

    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: "123",
            noteId: event.pathParameters.id,
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":content": data.content || null,
            ":attachment": data.attachment || null,
        },
        ReturnValues: "ALL_NEW",
    };

    await dynamoDB.update(params);

    return {
        status: true
    };

});