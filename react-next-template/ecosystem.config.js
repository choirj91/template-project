module.exports = {
    apps: [
        {
            name: 'web',
            script: './node_modules/next/dist/bin/next',
            args: 'start -p ' + (process.env.PORT || 3000),
            watch: true, // 파일이 변경되면 자동으로 재실행 (true || false)
            instances: 0,
            exec_mode: 'cluster', // 클러스터 모드
            env_production: {
                "NODE_ENV": "production" // 배포환경시 적용될 설정 지정
            }
        }
    ]
}