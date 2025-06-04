import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommonHttpService {
    
    constructor(private http: HttpClient) {}
    
    public sendGetRequest<T>(url: string, extraHeaders?: {[header: string]: string | null}): Observable<T> {
        return this.http.get<T>(url, {headers : this.getHeaders(extraHeaders)});
    }

    public sendPostRequest<T>(url: string, body: any, extraHeaders?: {[header: string]: string | null}): Observable<T> {
        return this.http.post<T>(url, body, {headers : this.getHeaders(extraHeaders)});
    }

    public sendPutRequest<T>(url: string, body: any, extraHeaders?: {[header: string]: string | null}): Observable<T> {
        return this.http.put<T>(url, body, {headers : this.getHeaders(extraHeaders)});
    }

    public sendDeleteRequest<T>(url: string, extraHeaders?: {[header: string]: string | null}): Observable<T> {
        return this.http.delete<T>(url, {headers : this.getHeaders(extraHeaders)});
    }

    public getHeaders(extraHeaders?: any) : HttpHeaders {
        return new HttpHeaders({
            ...extraHeaders,
        });;
    }
}