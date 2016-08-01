function notify_bb8 {
  EXITCODE="$?"
  (echo $EXITCODE | nc localhost 8081) ||:
  return $EXITCODE
}

PROMPT='$(notify_bb8)'$PROMPT
