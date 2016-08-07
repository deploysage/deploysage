port module Main exposing (..)

import Html exposing (Html, Attribute, div, span, input, text, a)
import Html.App as Html
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import String

import Utils.Reverser exposing (reverseIt)

main =
  Html.program -- change to non beginnerProgram
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

-- MODEL

type alias Model =
  { state : String
  }

model : Model
model =
  Model ""

init : (Model, Cmd Msg)
init =
  (Model "", Cmd.none)

-- UPDATE

type Msg
  = Publish String
  | Receive String

port publishUpdate : String -> Cmd msg

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Publish newState ->
      (model, publishUpdate newState)
    Receive newState ->
      ({ model | state = newState }, Cmd.none)

-- SUBSCRIPTIONS

port receiveChangeOperationsDocument : (String -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
  receiveChangeOperationsDocument Receive

-- VIEW

view : Model -> Html Msg
view model =
  div []
    [
      div [] [
        span [] [ text "Send the state down: " ]
      , input [ placeholder "type model state", value model.state, onInput Publish ] []
      ]
    , div [] [
        span [] [ text "Flip it and reverse it: " ]
      , span [] [
          a [ href "https://youtu.be/UODX_pYpVxk", target "_" ] [
            text (reverseIt model.state)
          ]
        ]
      ]
    ]
