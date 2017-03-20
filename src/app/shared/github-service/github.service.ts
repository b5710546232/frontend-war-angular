import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { RepoDetail } from '../repo-detail';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
export { RepoDetail } from '../repo-detail';

@Injectable()
export class GithubService {
  static header = new Headers({ 'Accept': 'application/vnd.github.v3+json' });

  constructor(private http: Http) {
  }

  getRepo(owner: string, repoName: string) {
    return this.http
      .get(`https://api.github.com/repos/${owner}/${repoName}`, { headers: GithubService.header })
      .map(response => new RepoDetail(response.json()));
  }

  getPullRequest(fullRepoName: string): Observable<number> {
    return this.http
      .get(`https://api.github.com/search/issues?q=+type:pr+repo:${fullRepoName}&sort=created&‌​order=asc`, { headers: GithubService.header })
      .map(prCount => prCount.json().total_count);
  }

  getStargazers(owner: string, repo: string, page: number, perPage = 30): Observable<string[]> {
    return this.http.get(`https://api.github.com/repos/${owner}/${repo}/stargazers?page=${page}&per_page=${perPage}`)
      .map(stargazers => stargazers.json().map(stargazer => stargazer.avatar_url));
  }

}
