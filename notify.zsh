function notify_bb8 {
  EXITCODE="$?"
  (echo $EXITCODE | nc -w0 -u localhost 8081) ||:
  return $EXITCODE
}

PROMPT='$(notify_bb8)'$PROMPT
