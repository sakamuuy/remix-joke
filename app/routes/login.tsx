import { LinksFunction, useSearchParams, Link, json, ActionFunction } from "remix";
import stylesUrl from "../styles/login.css"

export const links: LinksFunction = () => {
  return [{
    rel: "stylesheet",
    href: stylesUrl
  }]
}

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return 'Usernames must be at least 3 characters long'
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 6) {
    return `Passwords must be at least 6 characters long`
  }
}

type ActionData = {
  formError?: string
  fieldErrors?: {
    username: string | undefined
    password: string | undefined
  }
  fields?: {
    loginType: string;
    username: string;
    password: string;
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const loginType = form.get('loginType')
  const username = form.get('username')
  const password = form.get('password')
  const redirectTo = form.get('redirectTo') || 'jokes'
  if (
    typeof loginType !== 'string' ||
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest({
      formError: 'Form no submitted correctly.'
    })
  }

  const fields = { loginType, username, password }
  const fieldErrors = {
    username: validateUsername(username),
    
  }
}

export default function Login() {
  const [searchParams] = useSearchParams()
  return (
    <div className="container">
      <div className="content" data-light="">
        <h1>Login</h1>
        <form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={
              searchParams.get("redirectTo") ?? undefined
            }
          />
          <fieldset>
            <legend className="sr-only">
              Login or Register?
            </legend>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked
              />{" "}
              Login
            </label>
            <label>
              <input
                type="radio"
                name="loginType"
                value="register"
              />{" "}
              Register
            </label>
          </fieldset>
          <div>
            <label htmlFor="username-input">Username</label>
            <input
              type="text"
              id="username-input"
              name="username"
            />
          </div>
          <div>
            <label htmlFor="password-input">Password</label>
            <input
              id="password-input"
              name="password"
              type="password"
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jokes">Jokes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}