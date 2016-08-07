module Utils.ReverserTest exposing (..)

import Test exposing (..)
import Expect
import Fuzz exposing (..)
import String exposing (reverse)

import Utils.Reverser exposing (reverseIt)

reverser =
  describe "Reverser reverseIt"
    [ describe "test"
      [ test "reverses" <|
        \() ->
          reverseIt "Missy Elliott"
            |> Expect.equal "ttoillE yssiM"
      ]
    , describe "fuzz"
      [ fuzzWith { runs = 100 } ( string ) "reverses" <|
        \ str ->
          reverseIt str
            |> Expect.equal (reverse str)
      ]
    ]
