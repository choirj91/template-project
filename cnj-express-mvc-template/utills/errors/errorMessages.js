const DEFAULT_HTTP_STATUS_MESSAGES = {
    400: 'Bad Requests',
    401: '권한이 없습니다.',
    403: 'Foribdden',
    404: 'Not Found',
    // 500: 'Internal Server Error',
    500: '앗! 문제가 발생했어요.\n잠시 후 다시 시도해주세요.',
    503: 'Temporary Unavailable',
    // 계정
    999: '사용자 인증 정보가 만료되었습니다.',
    998: '사용자 정보가 존재하지 않습니다.',
    997: '로그인이 필요합니다.',
    996: '사용자 인증정보가 올바르지 않습니다.',
    995: '로그인 인증요청이 실패되었습니다.',
    900: 'App 업데이트가 필요합니다.',
    // 공통
    599: '필요한 파라미터가 제공되지 않았습니다.',
    598: '데이터를 불러올 수 없습니다.',
  }

  module.exports = DEFAULT_HTTP_STATUS_MESSAGES;