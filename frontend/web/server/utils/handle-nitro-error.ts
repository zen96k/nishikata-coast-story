import type { H3Error } from "h3"
import statusCode from "../../constant-variable/status-code"

const handleNitroError = (error: H3Error) => {
  if (error.statusCode && error.statusMessage && error.message) {
    throw createError(error)
  } else {
    throw createError({
      statusCode: statusCode.InternalServerError.code,
      statusMessage: statusCode.InternalServerError.message
    })
  }
}

export default handleNitroError
