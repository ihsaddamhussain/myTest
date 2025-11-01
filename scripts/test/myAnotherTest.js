import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
export let errorRate = new Rate('errors');
export let options = {
    vus: 10,
    duration: '30s',
};
export default function () {
    let res = http.get('https://test.k6.io');
    let checkRes = check(res, {
        'is status 200': (r) => r.status === 200,
    });
    if (!checkRes) {
        errorRate.add(1);
    } else {
        errorRate.add(0);
    }
    sleep(1);
}