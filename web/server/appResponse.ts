export const APP_RESPONSES = {
    development: {     
       ok: {
			httpCode: 200,
            body: {
                code: 60,
                message: 'Ok'
            }
       },
	   created: {
			httpCode: 201,
            body: {
                code: 61,
                message: 'Created successfuly'
            }
       },
       deleted: {
			httpCode: 201,
            body: {
                code: 62,
                message: 'Deleted successfuly'
            }
       },
       edited: {
			httpCode: 201,
            body: {
                code: 63,
                message: 'Edited successfuly'
            }
       },
       merged: {
			httpCode: 201,
            body: {
                code: 63,
                message: 'Objects merged successfuly'
            }
       },
       incorrect_param: {
            httpCode: 400,
            body: {
                code: 30,
                message: 'Provide query parameters are incorrect: The "to"/"from" parameters should content valid date’s timestamp in seconds. The "to" parameter should be greater then "from".'
            }
        },
        incorrect_device_id: {
            httpCode: 400,
            body: {
                code: 31,
                message: 'Incorrect param: There is no device with specified id.'
            }
        },
	    incorrect_object_id: {
            httpCode: 400,
            body: {
                code: 32,
                message: 'Incorrect param: There is no object with specified id.'
            }
        },
        incorrect_body_param: {
            httpCode: 400,
            body: {
                code: 33,
                message: 'Provided body parameter is incorrect. The following key(s) is/are missing or incorrect.'
            }
        },
        incorrect_db_error: {
            httpCode: 400,
            body: {
                code: 145,
                message: 'A database issue appeared:'
            }
        },
        invalid_token: {
            httpCode: 401,
            body: {
                code: 80,
                message: 'The access token used in the request is incorrect or has expired'
            }
        },
        no_token: {
            httpCode: 401,
            body: {
                code: 81,
                message: 'No authentication token was provided in the request'
            }
        },
        permission_denied: {
            httpCode: 403,
            body: {
                code: 82,
                message: 'You are not authorized to perform this action'
            }
        },

        not_found: {
            httpCode: 404,
            body: {
                code: 50,
                message: 'Sorry, that resource does not exist'
            }
        },

        internal_error: {
            httpCode: 500,
            body: {
                code: 20,
                message: 'An unknown internal error occurred.'
            }
        },
        internal_dbs_error: {
            httpCode: 500,
            body: {
                code: 21,
                message: 'Database down.'
            }
        }
    },
    production: {
       ok: {
			httpCode: 200,
            body: {
                code: 60,
                message: 'Ok'
            }
       },
	   created: {
			httpCode: 201,
            body: {
                code: 61,
                message: 'Created successfuly'
            }
       },
       deleted: {
			httpCode: 201,
            body: {
                code: 62,
                message: 'Deleted successfuly'
            }
       },
       edited: {
			httpCode: 201,
            body: {
                code: 63,
                message: 'Edited successfuly'
            }
       },
       incorrect_param: {
            httpCode: 400,
            body: {
                code: 30,
                message: ''
            }
        },
        incorrect_db_error: {
            httpCode: 400,
            body: {
                code: 145,
                message: 'A database issue appeared:'
            }
        },
        invalid_token: {
            httpCode: 401,
            body: {
                code: 80,
                message: 'The access token used in the request is incorrect or has expired'
            }
        },
        no_token: {
            httpCode: 401,
            body: {
                code: 81,
                message: 'No authentication token was provided in the request'
            }
        },
        permission_denied: {
            httpCode: 403,
            body: {
                code: 82,
                message: 'You are not authorized to perform this action'
            }
        },

        not_found: {
            httpCode: 404,
            body: {
                code: 50,
                message: 'Sorry, that resource does not exist'
            }
        },

        internal_error: {
            httpCode: 500,
            body: {
                code: 20,
                message: 'An unknown internal error occurred.'
            }
        },
        internal_dbs_error: {
            httpCode: 500,
            body: {
                code: 21,
                message: 'An unknown internal error occurred.'
            }
        }
    }
}
