exports.handler = async (event: AWSLambda.APIGatewayEvent) => {
    console.log('event', JSON.stringify(event, null, 2))
    console.log('production', process.env.isProduction)
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: `Hello from cdk-app-todo ${event.path}`
    }
}

